<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CartCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $subtotal = $this->collection->sum(function ($value) {return $value->price;});
        $originalPrice = $this->collection->sum(function ($value) {return $value->series->price;});

        return [
            'data' => $this->collection,
            'cart_summary' => [
                'price' => Helper::rupiahFormat($originalPrice),
                'sale_discount' => Helper::rupiahFormat($originalPrice - $subtotal),
                'subtotal' => $subtotal,
                'subtotal_formatted' => Helper::rupiahFormat($subtotal)
            ]
        ];
    }
}
