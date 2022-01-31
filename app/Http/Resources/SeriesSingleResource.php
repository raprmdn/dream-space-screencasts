<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SeriesSingleResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'episodes' => $this->episodes,
            'price' => [
                'price_unformatted' => $this->price,
                'price_formatted' => Helper::rupiahFormat($this->price)
            ],
            'discount' => [
                'discount_unformatted' => $this->discount_price,
                'discount_formatted' => Helper::rupiahFormat($this->discount_price),
            ],
            'levels' => $this->levels,
            'status' => $this->status,
            'preview_url' => $this->preview_series,
            'source_code_url' => $this->source_code,
            'demo_url' => $this->project_demo,
            'thumbnail' => $this->seriesThumbnail,
            'archived_at' => $this->archived_at,
            'created_at' => $this->created_at->format('d M Y, H:i A'),
            'topics' => $this->whenLoaded('topics'),
            'videos' => VideoSingleResource::collection($this->whenLoaded('videos')),
            'videos_count' => $this->when(isset($this->videos_count), $this->videos_count),
            'runtime' => $this->runtime,
            'viewing_status' => [
                'is_discount' => $this->is_discount,
                'is_free' => $this->is_free,
                'is_watch_later' => Auth::check() && Auth::user()->seriesExistsInWatchlist($this->id),
                'is_exists_in_carts' => Auth::check() && Auth::user()->existsInCarts($this->id),
                'is_buyable' => Auth::check() && !Auth::user()->hasPurchased($this->id),
            ]
        ];
    }
}
