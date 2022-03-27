<?php

namespace App\Services;

use App\Http\Resources\CommentResource;
use Illuminate\Support\Facades\Auth;

class CommentService
{
    public function getVideoComments($video)
    {
        CommentResource::withoutWrapping();
        return CommentResource::collection(
            $video->comments()->where('parent_id', null)
                ->withCount(['replies', 'likes'])
                ->with(['user:id,name,username,profile_picture', 'replies' => function ($query) {
                    $query->withCount('likes')->with(['user:id,name,username,profile_picture']);
                }])
                ->latest()
                ->get()
        );
    }

    public function comment($attributes)
    {
        Auth::user()->comments()->create([
            'video_id' => $attributes['video_id'],
            'body' => $attributes['comment']
        ]);
    }

    public function replies($attributes)
    {
        if ($attributes['mentioned_user_id'] !== Auth::user()->id) {
            $attributes['comment'] =  $attributes['mentioned_username'] . ' ' . $attributes['comment'];
        }

        Auth::user()->comments()->create([
            'video_id' => $attributes['video_id'],
            'body' => $attributes['comment'],
            'parent_id' => $attributes['parent_id']
        ]);
    }
}
