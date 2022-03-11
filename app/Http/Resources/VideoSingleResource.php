<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VideoSingleResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $runtimeFormatted = Helper::runtimeFormatted($this->runtime);

        if (Auth::user()) {
            if (Auth::user()->hasPurchased($this->series_id)) {
                $sourceURL = $this->source;
            } else {
                $sourceURL = $this->is_free ? $this->source : null;
            }
        } else {
            $sourceURL = $this->is_free ? $this->source : null;
        }


        return [
            'id' => $this->id,
            'title' => $this->title,
            'source' => $sourceURL,
            'episode' => $this->episode,
            'runtime' =>[
                'runtime_unformatted' => $this->runtime,
                'runtime_formatted' => $runtimeFormatted,
            ],
            'description' => $this->description,
            'is_free' => $this->is_free,
            'is_archived' => $this->is_archived,
            'series' => $this->whenLoaded('series'),
            'created_at' => $this->created_at->format('d M Y, H:i A'),
            'newest' => Carbon::now()->lte(Carbon::parse($this->created_at)->addDays(2))
        ];
    }
}
