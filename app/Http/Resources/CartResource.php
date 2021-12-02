<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class CartResource extends JsonResource
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
            'user_id' => $this->user_id,
            'series_id' => $this->series_id,
            'price' => [
                'price_formatted' => Helper::rupiahFormat($this->price),
                'price_unformatted' => $this->price
            ],
            'series' => $this->series
        ];
    }
}
