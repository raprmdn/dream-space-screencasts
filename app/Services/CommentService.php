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
                    $query->withCount('likes')->with(['user:id,name,username,profile_picture'])->oldest();
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
        Auth::user()->comments()->create([
            'video_id' => $attributes['video_id'],
            'body' => $attributes['comment'],
            'parent_id' => $attributes['parent_id']
        ]);
    }

    public function updateComment($attributes, $comment)
    {
        $comment->update([
            'body' => $attributes['comment'],
            'edited' => true
        ]);
    }

    public function deleteComment($comment)
    {
        $comment->likes()->delete();
        $comment->delete();
    }
}
