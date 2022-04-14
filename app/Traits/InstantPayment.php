<?php

namespace App\Traits;

use Exception;
use Illuminate\Support\Facades\Auth;

trait InstantPayment {

    public function makeInstantPaymentRequest($channel, $invoice, $grossAmount, $seriesItemsDetailsTransform): array
    {
        switch ($channel->identifier_channel) {
            case 'bri' :
            case 'bca' :
            case 'bni' :
                return $this->getPayloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->request_BRI_BCA_BNI($channel)
                );
            case 'mandiri' :
                return $this->getPayloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->request_Mandiri($channel, $invoice)
                );
            case 'permata' :
                return $this->getPayloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->request_Permata($channel)
                );
            case 'gopay' :
                return $this->getPayloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->request_Gopay($channel)
                );
            case 'alfamart' :
            case 'indomaret' :
                return $this->getPayloads(
                    $channel, $invoice, $grossAmount,
                    $seriesItemsDetailsTransform, $this->request_Alfamart_Indomaret($channel)
                );
            default :
                throw new Exception("There's was an issue. Couldn't find the payment method.");
        }
    }

    private function getPayloads($channel, $invoice, $grossAmount, $seriesItemsDetailsTransform, $requestTransfer): array
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

    private function request_BRI_BCA_BNI($channel): array
    {
        return [
            $channel->type => [
                "bank" => $channel->identifier_channel,
                "va_number" => ""
            ]
        ];
    }

    private function request_Mandiri($channel, $invoice): array
    {
        return [
            $channel->type => [
                "bill_info1" => "Payment : $invoice",
                "bill_info2" => "Course purchase.",
            ]
        ];
    }

    private function request_Permata($channel): array
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

    private function request_Gopay($channel): array
    {
        return [
            $channel->type => [
                "enable_callback" => false,
                "callback_url" => "someapps://callback"
            ]
        ];
    }

    public function request_Alfamart_Indomaret($channel): array
    {
        return [
            $channel->type => [
                "store" => $channel->identifier_channel,
                "message" => "Purchasing online course.",
            ]
        ];
    }

}
