<?php

namespace App\Services;

use App\Http\Resources\VideoCollection;
use App\Http\Resources\VideoSingleResource;
use App\Models\Series;
use App\Models\Video;

class VideoService
{
    public function findAllWithParams($params): VideoCollection
    {
        return new VideoCollection(Video::with(['series:id,title'])->search($params));
    }

    public function findAllOnlyTrashed($params): VideoCollection
    {
        return new VideoCollection(Video::onlyTrashed()->with('series:id,title')->search($params));
    }

    public function findBySeries($series): VideoCollection
    {
        return new VideoCollection(Video::where('series_id', $series->id)->orderBy('episode')->get());
    }

    public function findVideosBySeries($series)
    {
        VideoSingleResource::withoutWrapping();
        $videos = Video::where('series_id', $series->id)->orderBy('episode')->notArchived()->get();

        return VideoSingleResource::collection($videos);
    }

    public function getCurrentVideo($seriesID, $video): array
    {
        $nextTo = $video->episode + 1;
        $prevTo = $video->episode - 1;
        $hasNext = Video::where('series_id', $seriesID)->where('episode', $nextTo)
                    ->notArchived()->exists();
        $hasPrev = Video::where('series_id', $seriesID)->where('episode', $prevTo)
                    ->notArchived()->exists();
        $nextVideo = Video::where('series_id', $seriesID)
                    ->where('episode', $nextTo)->notArchived()->first(['id', 'title', 'episode']);
        VideoSingleResource::withoutWrapping();

        return [
            'has_next' => $hasNext,
            'has_prev' => $hasPrev,
            'next_to' => $hasNext ? $nextTo : null,
            'prev_to' => $hasPrev ? $prevTo : null,
            'next_video_is' => $hasNext ? $nextVideo : null,
            'current_video' => new VideoSingleResource($video)
        ];
    }

    public function save(array $attributes)
    {
        $series = Series::whereId($attributes['series']['value'])->firstOrFail();
        return $series->videos()->create($this->_fields($attributes));
    }

    public function update(array $attributes, $video)
    {
        return $video->update($this->_fields($attributes));
    }

    public function delete($video)
    {
        return $video->delete();
    }

    public function restore($video)
    {
        return Video::whereId($video)->withTrashed()->restore();
    }

    public function forceDelete($video): ?bool
    {
        $video = Video::whereId($video)->withTrashed()->first();
        return $video->forceDelete();
    }

    private function _fields(array $attributes): array
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
