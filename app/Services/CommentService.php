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
            $video->comments()
                ->with('user:id,name,username,profile_picture')
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
}
