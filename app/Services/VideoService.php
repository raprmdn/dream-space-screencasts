<?php

namespace App\Services;

use App\Http\Resources\VideoCollection;
use App\Models\Series;
use App\Models\Video;

class VideoService
{
    public function findAllWithParams($params): VideoCollection
    {
        return new VideoCollection(Video::with(['series:id,title'])->search($params));
    }

    public function save(array $attributes)
    {
        $series = Series::whereId($attributes['series']['value'])->firstOrFail();
        return $series->videos()->create($this->fields($attributes));
    }

    public function update(array $attributes, $video)
    {
        return $video->update($this->fields($attributes));
    }

    private function fields(array $attributes)
    {
        return [
            isset($attributes['id']), 'series_id' => $attributes['series']['value'],
            'title' => $attributes['title'],
            'source' => $attributes['source'],
            'episode' => $attributes['episode'],
            'runtime' => $attributes['runtime'],
            'is_free' => $attributes['is_free'],
            'is_archived' => $attributes['is_archived']
        ];
    }
}
