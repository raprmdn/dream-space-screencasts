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
                "bank_transfer" => [
                    "bank" => $channel->identifier_channel,
                    "va_number" => ""
                ]
            ];

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
        });
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
        $order->update([
            'payment_type' => $response->payment_type,
            'channel_name' => $response->va_numbers[0]->bank,
            'virtual_number' => $response->va_numbers[0]->va_number,
            'status_code' => $response->status_code,
            'transaction_time' => $response->transaction_time
        ]);
    }

    private function _midtransPaymentResponse($response, $responseBody)
    {
        PaymentMidtransResponse::updateOrCreate(['order_id' => $response->order_id],
        [
            'bank' => $response->va_numbers[0]->bank ?? null,
            'va_number' => $response->va_numbers[0]->va_number ?? null,
            'payment_type' => $response->payment_type ?? null,
            'store' => null,
            'permata_va_number' => null,
            'status_code' => $response->status_code ?? null,
            'status_message' => $response->status_message ?? null,
            'transaction_id' => $response->transaction_id ?? null,
            'merchant_id' => $response->merchant_id ?? null,
            'gross_amount' => $response->gross_amount ?? null,
            'currency' => $response->currency ?? null,
            'transaction_time' => $response->transaction_time ?? null,
            'transaction_status' => $response->transaction_status ?? null,
            'fraud_status' => $response->fraud_status ?? null,
            'bill_key' => null,
            'biller_code' => null,
            'payment_code' => null,
            'signature_key' => $response->signature_key ?? null,
            'acquirer' => null,
            'settlement_time' => null,
            'approval_code' => null,
            'actions' => null,
            'response_body' => $responseBody ?? null,
        ]);
    }

}
