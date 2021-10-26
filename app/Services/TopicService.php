<?php

namespace App\Services;

use App\Http\Resources\TopicCollection;
use App\Models\Topic;
use App\Traits\ImageTrait;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TopicService {

    use ImageTrait;

    public function findAllWithParams($params) : TopicCollection
    {
        return new TopicCollection(Topic::withCount('series')->search($params));
    }

    public function findAllOnlyTrashed($params) : TopicCollection
    {
        return new TopicCollection(Topic::onlyTrashed()->withCount('series')->search($params));
    }

    public function save(array $attributes) : Topic
    {
        $picture = $attributes['picture'];
        $attributes['slug'] = Str::slug($attributes['name']);
        $attributes['picture'] = $this->assignPicture('icon/topic', $picture, $attributes['slug']);

        return Topic::create($this->fields($attributes));
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

        return $topic->update($this->fields($attributes));
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

    private function fields(array $attributes): array
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
