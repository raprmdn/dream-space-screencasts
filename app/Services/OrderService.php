<?php

namespace App\Services;

use App\Http\Resources\ItemDetailsResource;
use App\Http\Resources\SeriesResource;
use App\Models\MidtransConfig;
use App\Models\Order;
use App\Models\PaymentChannel;
use App\Models\PaymentMidtransResponse;
use App\Models\Series;
use App\Models\User;
use Auth;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Midtrans\Config;
use Midtrans\CoreApi;
use Midtrans\Notification;

class OrderService
{
    public function __construct()
    {
        $midtransConfig = MidtransConfig::first();
        Config::$serverKey = $midtransConfig->server_key;
        Config::$isProduction = $midtransConfig->environment;
        Config::$isSanitized = $midtransConfig->sanitized;
        Config::$is3ds = $midtransConfig->enable_3d_secure;
    }

    public function makeAnOrder($identifierCode)
    {
        $channel = PaymentChannel::where('identifier_code', $identifierCode)->firstOrFail();
        if ($channel->status === 'Inactive')
            throw new Exception("There's was an issue, please try again later.");

        $this->response = null;
        DB::transaction(function () use ($channel) {
            $invoice = now()->format('dmy') . rand(100000, 999999);
            $identifier = Str::uuid();

            $seriesPluckId = Auth::user()->carts()->pluck('series_id');
            $grossAmount = Auth::user()->carts()->sum('price');

            $series = Series::whereIn('id', $seriesPluckId)->get();
            $seriesItemsDetailsTransform = ItemDetailsResource::collection($series);
            $seriesTransform = SeriesResource::collection($series);

            $order = Auth::user()->orders()->create([
                'payment_channel_id' => $channel->id,
                'invoice' => $invoice,
                'identifier' => $identifier,
                'series' => $seriesTransform->toJson(),
                'gross_amount' => $grossAmount,
            ]);

            if (in_array($channel->identifier_channel, ['bri', 'bca', 'bni'])) {
                $payloads = $this->_payloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->_request_BRI_BCA_BNI($channel)
                );
            } else if ($channel->identifier_channel === 'mandiri') {
                $payloads = $this->_payloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->_request_Mandiri($channel, $invoice)
                );
            } else if ($channel->identifier_channel === 'permata') {
                $payloads = $this->_payloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->_request_Permata($channel)
                );
            } else if ($channel->identifier_channel === 'gopay') {
                $payloads = $this->_payloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->_request_Gopay($channel)
                );
            } else if ($channel->identifier_channel === 'alfamart' || $channel->identifier_channel === 'indomaret') {
                $payloads = $this->_payloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->_request_Alfamart_Indomaret($channel)
                );
            } else {
                dd('stop');
            }

            try {
                $midtransResponse = CoreApi::charge($payloads);
            } catch (Exception $exception) {
                throw new Exception("There's was an issue, please try again later.");
            }

            $this->_updateOrderTable($order, $midtransResponse);
            $this->_midtransPaymentResponse($midtransResponse, json_encode($midtransResponse));
            Auth::user()->carts()->delete();

            $this->response = $midtransResponse;
        });

        return $this->response;
    }

    public function notificationHandler()
    {
        $notification = new Notification();
        DB::transaction(function () use ($notification) {
            $status = $notification->transaction_status;
            $paymentType = $notification->payment_type;
            $invoice = $notification->order_id;
            $fraudStatus = $notification->fraud_status;
            $statusCode = $notification->status_code;

            \Log::info('notification from midtrans', [$notification->getResponse()]);
            $order = Order::where('invoice', $invoice)->firstOrFail();
            $this->_midtransPaymentResponse($notification, json_encode($notification->getResponse()));

            $this->_orderStatusHandling($status, $paymentType, $fraudStatus, $order, $statusCode);
        });
    }

    private function _request_BRI_BCA_BNI($channel): array
    {
        return [
            $channel->type => [
                "bank" => $channel->identifier_channel,
                "va_number" => ""
            ]
        ];
    }

    private function _request_Mandiri($channel, $invoice): array
    {
        return [
            $channel->type => [
                "bill_info1" => "Payment : $invoice",
                "bill_info2" => "Course purchase.",
            ]
        ];
    }

    private function _request_Permata($channel): array
    {
        return [
            $channel->type => [
                "bank" => $channel->identifier_channel,
                "permata" => [
                    "recipient_name" => Auth::user()->name
                ]
            ]
        ];
    }

    private function _request_Gopay($channel): array
    {
        return [
            $channel->type => [
                "enable_callback" => false,
                "callback_url" => "someapps://callback"
            ]
        ];
    }

    public function _request_Alfamart_Indomaret($channel): array
    {
        return [
            $channel->type => [
                "store" => $channel->identifier_channel,
	            "message" => "Purchasing online course.",
            ]
        ];
    }

    private function _payloads($channel, $invoice, $grossAmount, $seriesItemsDetailsTransform, $requestTransfer): array
    {
        $payloads = [
            "payment_type" => $channel->type,
            "transaction_details" => [
                'order_id' => $invoice,
                'gross_amount' => $grossAmount
            ],
            "customer_details" => [
                'first_name' => Auth::user()->name,
                'email' => Auth::user()->email
            ],
            "item_details" => $seriesItemsDetailsTransform,
        ];

        return array_replace_recursive($payloads, $requestTransfer);
    }

    private function _userSuccessPurchasing($order)
    {
        $user = User::findOrFail($order->user_id);
        $seriesOrderJson = json_decode($order->series);
        $seriesOrderCollectionId = collect($seriesOrderJson)->pluck('id');

        $user->purchasing($seriesOrderCollectionId);
    }

    private function _updateOrderTable($order, $response)
    {
        $virtualNumber = null;
        $actions = null;

        if (isset($response->va_numbers[0]->bank)) {
            $channelName = $response->va_numbers[0]->bank;
            $virtualNumber = $response->va_numbers[0]->va_number;
        } else if (isset($response->bill_key)) {
            $channelName = 'mandiri';
        } else if (isset($response->permata_va_number)) {
            $channelName = 'permata';
        } else if (isset($response->actions)) {
            $channelName = 'gopay';
            $actions = json_encode($response->actions);
        } else if (isset($response->payment_code)) {
            $channelName = $response->store;
        } else {
            $channelName = null;
        }

        $order->update([
            'payment_type' => $response->payment_type,
            'channel_name' => $channelName,
            'virtual_number' => $virtualNumber,
            'permata_va_number' => $response->permata_va_number ?? null,
            'bill_key' => $response->bill_key ?? null,
            'biller_code' => $response->biller_code ?? null,
            'actions' => $actions,
            'payment_code' => $response->payment_code ?? null,
            'status_code' => $response->status_code,
            'transaction_time' => $response->transaction_time
        ]);
    }

    private function _orderStatusHandling($status, $paymentType, $fraudStatus, $order, $statusCode)
    {
        if ($status == 'capture') {
            if ($paymentType == 'credit_card') {
                if ($fraudStatus == 'challenge') {
                    $order->setStatusPending();
                } else {
                    $order->setStatusSuccess();
                    $this->_userSuccessPurchasing($order);
                }
                $order->update(['status_code' => $statusCode]);
            }
        } else if ($status == 'settlement') {
            $order->setStatusSuccess();
            $order->update(['status_code' => $statusCode]);
            $this->_userSuccessPurchasing($order);
        } else if ($status == 'pending') {
            $order->setStatusPending();
            $order->update(['status_code' => $statusCode]);
        } else if ($status == 'deny') {
            $order->setStatusFailed();
            $order->update(['status_code' => $statusCode]);
        } else if ($status == 'expire') {
            $order->setStatusExpired();
            $order->update(['status_code' => $statusCode]);
        } else if ($status == 'cancel') {
            $order->setStatusFailed();
            $order->update(['status_code' => $statusCode]);
        }
    }

    private function _midtransPaymentResponse($response, $responseBody)
    {
        PaymentMidtransResponse::updateOrCreate(['order_id' => $response->order_id],
        [
            'bank' => $response->va_numbers[0]->bank ?? null,
            'va_number' => $response->va_numbers[0]->va_number ?? null,
            'payment_type' => $response->payment_type ?? null,
            'store' => $response->store ?? null,
            'permata_va_number' => $response->permata_va_number ?? null,
            'status_code' => $response->status_code ?? null,
            'status_message' => $response->status_message ?? null,
            'transaction_id' => $response->transaction_id ?? null,
            'merchant_id' => $response->merchant_id ?? null,
            'gross_amount' => $response->gross_amount ?? null,
            'currency' => $response->currency ?? null,
            'transaction_time' => $response->transaction_time ?? null,
            'transaction_status' => $response->transaction_status ?? null,
            'fraud_status' => $response->fraud_status ?? null,
            'bill_key' => $response->bill_key ?? null,
            'biller_code' => $response->biller_code ?? null,
            'payment_code' => $response->payment_code ?? null,
            'signature_key' => $response->signature_key ?? null,
            'acquirer' => $response->acquirer ?? null,
            'settlement_time' => $response-> settlement_time ?? null,
            'approval_code' => $response->approval_code ?? null,
            'actions' => isset($response->actions) ? json_encode($response->actions) : null,
            'response_body' => $responseBody ?? null,
        ]);
    }

}
