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
        $price = $this->collection->sum(function ($value) {return $value->price;});

        return [
            'data' => $this->collection,
            'total_price' => [
                'price_formatted' => Helper::rupiahFormat($price),
                'price_unformatted' => $price
            ]
        ];
    }
}
