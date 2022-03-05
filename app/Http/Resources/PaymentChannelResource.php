<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class PaymentChannelResource extends JsonResource
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
            'payment_type_id' => $this->payment_type_id,
            'payment_channel' => $this->payment_channel,
            'identifier_channel' => $this->identifier_channel,
            'type' => $this->type,
            'identifier_code' => $this->identifier_code,
            'virtual_number' => $this->virtual_number,
            'payment_channel_owner' => $this->payment_channel_owner,
            'image' => $this->imageChannel,
            'instruction' => $this->instruction,
            'status' => $this->status,
            'archived' => (bool) $this->archived
        ];
    }
}
