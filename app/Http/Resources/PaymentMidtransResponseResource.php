<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\PaymentMidtransResponse */
class PaymentMidtransResponseResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'bank' => $this->bank,
            'va_number' => $this->va_number,
            'payment_type' => $this->payment_type,
            'store' => $this->store,
            'permata_va_number' => $this->permata_va_number,
            'status_code' => $this->status_code,
            'status_message' => $this->status_message,
            'transaction_id' => $this->transaction_id,
            'merchant_id' => $this->merchant_id,
            'gross_amount' => [
                'formatted' => Helper::rupiahFormat($this->gross_amount),
                'raw' => $this->gross_amount,
            ],
            'currency' => $this->currency,
            'transaction_time' => $this->transaction_time,
            'transaction_status' => $this->transaction_status,
            'fraud_status' => $this->fraud_status,
            'bill_key' => $this->bill_key,
            'biller_code' => $this->biller_code,
            'payment_code' => $this->payment_code,
            'signature_key' => $this->signature_key,
            'acquirer' => $this->acquirer,
            'settlement_time' => $this->settlement_time,
            'approval_code' => $this->approval_code,
            'actions' => $this->actions,
            'response_body' => $this->response_body,
            'created_at' => $this->created_at,
        ];
    }
}
