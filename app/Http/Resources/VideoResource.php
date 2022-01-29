<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VideoResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $runtime_formatted = Carbon::parse($this->runtime)->format('h:i:s');
        $exploded = explode(':', $runtime_formatted);
        $exploded[0] === '12'
            ? $runtimeFormatted = Carbon::parse($this->runtime)->format('i:s')
            : $runtimeFormatted = Carbon::parse($this->runtime)->format('h:i:s');

        if (Auth::user()) {
            if (Auth::user()->purchases->find($this->series_id)) {
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
            'is_free' => $this->is_free,
            'is_archived' => $this->is_archived,
            'series' => $this->whenLoaded('series'),
            'created_at' => $this->created_at->format('d M Y, H:i A'),
            'newest' => Carbon::now()->lte(Carbon::parse($this->created_at)->addDays(2))
        ];
    }
}
