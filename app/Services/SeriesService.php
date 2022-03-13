<?php

namespace App\Services;

use App\Helpers\Helper;
use App\Http\Resources\{SeriesCollection, SeriesResource, SeriesSingleResource};
use App\Models\{Cart, Series};
use App\Traits\ImageTrait;
use Illuminate\Support\{Facades\Auth, Facades\Storage, Str};

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
            Helper::castingRuntime($series);
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
            ->first();

        Helper::castingRuntime($series);
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
            Helper::castingRuntime($series);
            return $series;
        });

        foreach ($series as $course) {
            unset($course->videos, $course->hours, $series->pivot);
        }

        return new SeriesCollection($series);
    }

    public function findByIdWithTopics($id): SeriesSingleResource
    {
        $series = Series::whereId($id)->with('topics:id,name,slug')->first();

        return new SeriesSingleResource($series);
    }

    public function getSeriesIdAndTitle()
    {
        return Series::latest()->get(['id', 'title'])->makeHidden('series_thumbnail');
    }

    public function getSingleLatestSeries(): Series
    {
        return Series::latest()->notArchived()->take(1)->first(['id', 'title', 'slug', 'thumbnail']);
    }

    public function getCurrentSeries($series): SeriesSingleResource
    {
        return new SeriesSingleResource($series->load('topics:id,name,slug'));
    }

    public function getUserPurchasedSeries()
    {
        $series = Auth::user()->purchases()->with(['topics:id,name,slug', 'videos'])
                    ->get()->map(function ($series) {
                        Helper::castingRuntime($series);
                        unset($series->videos);
                        return $series;
                    });
        SeriesResource::withoutWrapping();

        return SeriesResource::collection($series);
    }

    public function save($attributes): array
    {
        $picture = $attributes['thumbnail'];
        $attributes['slug'] = Str::slug($attributes['title']) . '-' . now()->format('His');
        $attributes['thumbnail'] = $this->assignPicture('thumbnail/series', $picture, $attributes['slug']);
        $series = Series::create($this->_fields($attributes));

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
        $series->update($this->_fields($attributes));

        $price = !$series->discount_price ? $series->price : $series->discount_price;
        Cart::where('series_id', $series->id)->update([
            'price' => $price
        ]);

        return $series->topics()->sync(collect($attributes['topics'])->pluck('value'));
    }

    public function delete($series)
    {
        $series->carts()->delete();
        return $series->delete();
    }

    public function restore($series)
    {
        return Series::whereId($series)->withTrashed()->restore();
    }

    public function forceDelete($series): ?bool
    {
        $series = Series::whereId($series)->withTrashed()->first();
        Storage::delete($series->thumbnail);
        return $series->forceDelete();
    }

    private function _fields(array $attributes) : array
    {
        if ($attributes['is_free']) {
            $attributes['price'] = null;
            $attributes['discount_price'] = null;
            $attributes['is_discount'] = false;
        }
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
}
