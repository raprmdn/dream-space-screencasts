<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class OrderResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $actions = json_decode($this->actions);
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'invoice_to' => [
                'id_user_order' => $this->user->id,
                'name_user_order' => $this->user->name,
                'email_user_order' => $this->user->email,
            ],
            'invoice_number' => $this->invoice,
            'identifier_url' => $this->identifier,
            'series_items' => json_decode($this->series),
            'total' => [
                'total_unformatted' => $this->gross_amount,
                'total_formatted' => Helper::rupiahFormat($this->gross_amount)
            ],
            'payment_type' => $this->payment_type,
            'payment_channel' => strtoupper($this->channel_name),
            'virtual_number' => $this->virtual_number,
            'permata_va' => $this->permata_va_number,
            'bill_key' => $this->bill_key,
            'biller_code' => $this->biller_code,
            'payment_code' => $this->payment_code,
            'qr_code' => $actions[0]->url ?? null,
            'status' => strtoupper($this->status),
            'status_code' => $this->status_code,
            'order_date' => $this->transaction_time->format('d F Y H:i'),
            'paid_at' =>  isset($this->paid_at) ? $this->paid_at->format('d F Y H:i') : null,
            'instruction' => $this->channel->instruction,
        ];
    }
}
