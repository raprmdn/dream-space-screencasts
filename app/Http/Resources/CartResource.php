<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            'series' => [
                'id' => $this->series->id,
                'title' => $this->series->title,
                'slug' => $this->series->slug,
                'price' => Helper::rupiahFormat($this->series->price),
                'discount_price' => Helper::rupiahFormat($this->series->discount_price),
                'is_discount' => $this->series->is_discount,
                'is_watch_later' => Auth::user()->seriesExistsInWatchlist($this->series_id),
                'series_thumbnail' => $this->series->series_thumbnail,
                'topics' => $this->series->topics
            ],
        ];
    }
}
