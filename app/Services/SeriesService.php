<?php

namespace App\Services;

use App\Http\Resources\SeriesCollection;
use App\Http\Resources\SeriesSingleResource;
use App\Models\Series;
use App\Traits\ImageTrait;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SeriesService
{
    use ImageTrait;

    public function findAll(): SeriesCollection
    {
        $series = Series::with(['topics:id,name,slug', 'videos'])
            ->notArchived()
            ->latest()
            ->paginate(9);

        $series->getCollection()->transform(function ($series) {
            $this->castingRuntime($series);
            return $series;
        });

        foreach ($series as $course) {
            unset($course->videos);
        }

        return new SeriesCollection($series);
    }

    public function findAllWithParams($params): SeriesCollection
    {
        return new SeriesCollection(Series::withCount('videos')->search($params));
    }

    public function findAllOnlyTrash($params): SeriesCollection
    {
        return new SeriesCollection(Series::withCount('videos')->onlyTrashed()->search($params));
    }

    public function findBySlug($slug): SeriesSingleResource
    {
        $series = Series::whereSlug($slug)
            ->with(['topics:id,name,slug', 'videos' => function($q) {
                $q->notArchived()->orderBy('episode');
            }])
            ->withCount('videos')
            ->first();

        $this->castingRuntime($series);
        unset($series->hours);

        return new SeriesSingleResource($series);
    }

    public function findByTopic($topic): SeriesCollection
    {
        $series = $topic->series()->with(['topics:id,name,slug', 'videos'])
            ->notArchived()
            ->latest()
            ->paginate(9);

        $series->getCollection()->transform(function ($series) {
            $this->castingRuntime($series);
            return $series;
        });

        foreach ($series as $course) {
            unset($course->videos, $course->hours, $series->pivot);
        }

        return new SeriesCollection($series);
    }

    public function save($attributes): array
    {
        $picture = $attributes['thumbnail'];
        $attributes['slug'] = Str::slug($attributes['title']) . '-' . now()->format('His');
        $attributes['thumbnail'] = $this->assignPicture('thumbnail/series', $picture, $attributes['slug']);
        $series = Series::create($this->fields($attributes));

        return $series->topics()->sync(collect($attributes['topics'])->pluck('value'));
    }

    public function update($attributes, $series) : array
    {
        $picture = $attributes['thumbnail'];
        $attributes['slug'] = $series->slug;
        if (request()->hasFile('thumbnail')) {
            Storage::delete($series->thumbnail);
            $attributes['thumbnail'] = $this->assignPicture('thumbnail/series', $picture, $attributes['slug']);
        } else {
            $attributes['thumbnail'] = $series->thumbnail;
        }
        $series->update($this->fields($attributes));

        return $series->topics()->sync(collect($attributes['topics'])->pluck('value'));
    }

    public function delete($series)
    {
        return $series->delete();
    }

    public function restore($series)
    {
        return Series::whereId($series)->withTrashed()->restore();
    }

    public function forceDelete($series)
    {
        $series = Series::whereId($series)->withTrashed()->first();
        Storage::delete($series->thumbnail);
        return $series->forceDelete();
    }

    private function fields(array $attributes) : array
    {
        return [
            'title' => $attributes['title'],
            'slug' => $attributes['slug'],
            'description' => $attributes['description'],
            'episodes' => $attributes['episodes'],
            'price' => $attributes['price'],
            'discount_price' => $attributes['discount_price'],
            'levels' => $attributes['levels'],
            'status' => $attributes['status'],
            'preview_series' => $attributes['preview_series'],
            'source_code' => $attributes['source_code'],
            'project_demo' => $attributes['project_demo'],
            'thumbnail' => $attributes['thumbnail'],
            'is_discount' => $attributes['is_discount'],
            'is_free' => $attributes['is_free'],
            'archived_at' => $attributes['archived_at'] ? now() : null
        ];
    }

    private function castingRuntime($series)
    {
        $series->hours = $series->videos->map(function ($times) {
            return $times->runtime;
        });

        $sum = strtotime('00:00:00');
        $totals = 0;

        foreach ($series->hours as $element) {
            $timeinsec = strtotime($element) - $sum;
            $totals = $totals + $timeinsec;
        }

        $h = intval($totals / 3600);
        $totals = $totals - ($h * 3600);
        $m = intval($totals / 60);
        $s = $totals - ($m * 60);

        $series->runtime = [
            'h' => $h,
            'm' => $m,
            's' => $s
        ];
    }
}
