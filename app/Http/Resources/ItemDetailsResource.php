<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class ItemDetailsResource extends JsonResource
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
            'price' => !$this->discount_price ? $this->price : $this->discount_price,
            'quantity' => 1,
            'name' => $this->title
        ];
    }
}
