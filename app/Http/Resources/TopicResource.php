<?php

namespace App\Http\Resources;

use App\Models\Video;
use Illuminate\Http\Resources\Json\JsonResource;

class TopicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'picture' => $this->topicPicture,
            'is_archived' => $this->is_archived,
            'position' => $this->position,
            'series_count' => $this->when(isset($this->series_count), $this->series_count),
            'videos_count' => $this->when(isset($this->videos_count), $this->videos_count),
        ];
    }
}
