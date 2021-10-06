<?php

namespace App\Services;

use App\Http\Resources\TopicCollection;
use App\Models\Topic;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TopicService {

    public function findAll()
    {
        return new TopicCollection(Topic::latest()->paginate(10));
    }

    public function save($attributes)
    {
        $picture = $attributes['picture'];
        $slug = Str::slug($attributes['name']);
        $pathPicture = $this->assignPicture($picture, $slug);

        return Topic::create([
            'name' => $attributes['name'],
            'slug' => $slug,
            'description' => $attributes['description'],
            'picture' => $pathPicture,
            'position' => $attributes['position'],
            'is_archived' => $attributes['is_archived']
        ]);
    }

    private function assignPicture($picture, $slug) : string {
        $ext = $picture->getClientOriginalExtension();
        $picName = Str::random(4) . "-" . $slug . ".$ext";
        return Storage::putFileAs('icon/topic', $picture, $picName);
    }

}
