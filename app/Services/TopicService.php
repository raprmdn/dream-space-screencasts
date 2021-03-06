<?php

namespace App\Services;

use App\Http\Resources\TopicCollection;
use App\Models\Topic;
use App\Traits\ImageTrait;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TopicService {

    use ImageTrait;

    public function findAll()
    {
        return Topic::orderBy('position')->get(['id', 'name']);
    }

    public function findAllWithSeries(): TopicCollection
    {
        return new TopicCollection(
            Topic::notArchived()
                ->with(['series' => function($query) {
                    $query->select('id')->withCount('videos');
                }])
                ->withCount('series')
                ->orderBy('position')
                ->get()
                ->map(function ($topic) {
                    $topic->videos_count = $topic->series->sum('videos_count');
                    unset($topic->series);
                    return $topic;
                })
        );
    }

    public function findAllWithParams($params) : TopicCollection
    {
        return new TopicCollection(Topic::withCount('series')->search($params));
    }

    public function findAllOnlyTrashed($params) : TopicCollection
    {
        return new TopicCollection(Topic::onlyTrashed()->withCount('series')->search($params));
    }

    public function findBySlug($slug): Topic
    {
        return Topic::whereSlug($slug)->firstOrFail(['id', 'name', 'slug']);
    }

    public function getTopicByValue($number)
    {
        return Topic::orderBy('position')->take($number)->get(['name', 'slug']);
    }

    public function save(array $attributes) : Topic
    {
        $picture = $attributes['picture'];
        $attributes['slug'] = Str::slug($attributes['name']);
        $attributes['picture'] = $this->assignPicture('icon/topic', $picture, $attributes['slug']);

        return Topic::create($this->_fields($attributes));
    }

    public function update(array $attributes, $topic)
    {
        $picture = $attributes['picture'];
        $attributes['slug'] = Str::slug($attributes['name']);
        if (request()->hasFile('picture')) {
            Storage::delete($topic->picture);
            $attributes['picture'] = $this->assignPicture('icon/topic', $picture, $attributes['slug']);
        } else {
            $attributes['picture'] = $topic->picture;
        }

        return $topic->update($this->_fields($attributes));
    }

    public function delete($topic)
    {
        return $topic->delete();
    }

    public function restore($topic)
    {
        return Topic::whereId($topic)->withTrashed()->restore();
    }

    public function forceDelete($topic): ?bool
    {
        $topic = Topic::whereId($topic)->withTrashed()->first();
        if ($topic->series()->exists()) return false;

        Storage::delete($topic->picture);
        return $topic->forceDelete();

    }

    private function _fields(array $attributes): array
    {
        return [
            'name' => $attributes['name'],
            'slug' => $attributes['slug'],
            'description' => $attributes['description'],
            'picture' => $attributes['picture'],
            'position' => $attributes['position'],
            'is_archived' => $attributes['is_archived']
        ];
    }

}
