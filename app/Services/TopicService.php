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
        return new TopicCollection(Topic::search($params));
    }

    public function findAllOnlyTrashed($params) : TopicCollection
    {
        return new TopicCollection(Topic::onlyTrashed()->search($params));
    }

    public function save($attributes) : Topic
    {
        $picture = $attributes['picture'];
        $slug = Str::slug($attributes['name']);
        $pathPicture = $this->assignPicture('icon/topic', $picture, $slug);

        return Topic::create([
            'name' => $attributes['name'],
            'slug' => $slug,
            'description' => $attributes['description'],
            'picture' => $pathPicture,
            'position' => $attributes['position'],
            'is_archived' => $attributes['is_archived']
        ]);
    }

    public function update($attributes, $topic)
    {
        $picture = $attributes['picture'];
        $slug = Str::slug($attributes['name']);
        if (request()->hasFile('picture')) {
            Storage::delete($topic->picture);
            $pathPicture = $this->assignPicture('icon/topic', $picture, $slug);
        } else {
            $pathPicture = $topic->picture;
        }

        return $topic->update([
            'name' => $attributes['name'],
            'slug' => $slug,
            'description' => $attributes['description'],
            'picture' => $pathPicture,
            'position' => $attributes['position'],
            'is_archived' => $attributes['is_archived']
        ]);
    }

    public function delete($topic)
    {
        return $topic->delete();
    }

    public function restore($topic)
    {
        return Topic::whereId($topic)->withTrashed()->restore();
    }

    public function forceDelete($topic)
    {
        $topic = Topic::whereId($topic)->withTrashed()->first();
        Storage::delete($topic->picture);
        return $topic->forceDelete();
    }

}
