<?php

namespace App\Services;

use App\Http\Resources\SeriesCollection;
use App\Models\Series;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SeriesService
{

    public function findAll($params)
    {
        return new SeriesCollection(Series::with('topics:id,name,slug')->search($params));
    }

    public function save($attributes): array
    {
        $picture = $attributes['thumbnail'];
        $slug = Str::slug($attributes['title']);
        $pathPicture = $this->assignPicture($picture, $slug);

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

    private function assignPicture($picture, $slug) : string {
        $ext = $picture->getClientOriginalExtension();
        $picName = Str::random(4) . "-" . $slug . ".$ext";
        return Storage::putFileAs('thumbnail/series', $picture, $picName);
    }
}
