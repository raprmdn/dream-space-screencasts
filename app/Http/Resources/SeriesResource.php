<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class SeriesResource extends JsonResource
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
            'price' => $this->price,
            'price_formatter' => Helper::rupiahFormat($this->price),
            'discount' => $this->discount_price,
            'discount_formatter' => Helper::rupiahFormat($this->discount_price),
            'levels' => $this->levels,
            'status' => $this->status,
            'preview_url' => $this->preview_series,
            'source_code_url' => $this->source_code,
            'demo_url' => $this->project_demo,
            'thumbnail' => $this->thumbnail,
            'is_discount' => $this->is_discount,
            'is_free' => $this->is_free,
            'archived_at' => $this->archived_at,
            'created_at' => $this->created_at->format('d M Y, H:i A'),
            'topics' => $this->whenLoaded('topics'),
        ];
    }
}
