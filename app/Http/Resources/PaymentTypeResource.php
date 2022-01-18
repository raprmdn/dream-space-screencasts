<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class PaymentTypeResource extends JsonResource
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
            'payment_type' => $this->payment_type,
            'identifier' => $this->identifier,
            'description' => $this->description,
            'status' => $this->status,
            'archived' => $this->archived,
            'payment_channel' => null,
        ];
    }
}
