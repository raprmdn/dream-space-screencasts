<?php

namespace App\Services;

use App\Http\Resources\SeriesCollection;
use App\Models\Series;
use App\Traits\ImageTrait;
use Illuminate\Support\Str;

class SeriesService
{

    use ImageTrait;

    public function findAll($params): SeriesCollection
    {
        return new SeriesCollection(Series::with('topics:id,name,slug')->search($params));
    }

    public function save($attributes): array
    {
        $picture = $attributes['thumbnail'];
        $slug = Str::slug($attributes['title']);
        $pathPicture = $this->assignPicture('thumbnail/series', $picture, $slug);

        $series = Series::create([
            'title' => $attributes['title'],
            'slug' => $slug,
            'description' => $attributes['description'],
            'episodes' => $attributes['episodes'],
            'price' => $attributes['price'],
            'discount_price' => $attributes['price'],
            'levels' => $attributes['levels'],
            'status' => $attributes['status'],
            'preview_series' => $attributes['preview_series'],
            'source_code' => $attributes['source_code'],
            'project_demo' => $attributes['project_demo'],
            'thumbnail' => $pathPicture,
            'is_discount' => $attributes['is_discount'],
            'is_free' => $attributes['is_free'],
            'archived_at' => $attributes['archived_at'] ? now() : null
        ]);

        return $series->topics()->sync($attributes['topics']);
    }
}
