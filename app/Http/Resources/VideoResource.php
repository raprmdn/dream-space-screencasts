<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class VideoResource extends JsonResource
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
            'source' => $this->source,
            'episode' => $this->episode,
            'runtime' => $this->runtime,
            'is_free' => $this->is_free,
            'is_archived' => $this->is_archived,
            'series' => $this->whenLoaded('series'),
            'created_at' => $this->created_at->format('d M Y, H:i A'),
        ];
    }
}
