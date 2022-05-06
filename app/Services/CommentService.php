<?php

namespace App\Services;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentService
{
    public function getVideoComments($video)
    {
        return CommentResource::collection(
            $video->comments()->isParent()->notPinned()
                ->withCount(['replies', 'likes'])
                ->with(['user:id,name,username,profile_picture', 'replies' => function ($query) {
                    $query->withCount('likes')->with(['user:id,name,username,profile_picture'])->oldest();
                }])
                ->latest()
                ->simplePaginate(10)
        );
    }

    public function getPinnedComments($video)
    {
        return CommentResource::collection(
            $video->comments()->isParent()->pinned()
                ->withCount(['replies', 'likes'])
                ->with(['user:id,name,username,profile_picture', 'replies' => function ($query) {
                    $query->withCount('likes')->with(['user:id,name,username,profile_picture'])->oldest();
                }])
                ->latest()->get()
        );
    }

    public function comment($attributes): void
    {
        Auth::user()->comments()->create([
            'video_id' => $attributes['video_id'],
            'body' => $attributes['comment']
        ]);
    }

    public function replies($attributes): void
    {
        Auth::user()->comments()->create([
            'video_id' => $attributes['video_id'],
            'body' => $attributes['comment'],
            'parent_id' => $attributes['parent_id']
        ]);
    }

    public function pinComment($id): void
    {
        $comment = Comment::findOrFail($id);
        if ($comment->pinned) {
            $comment->unpin();
        } else {
            $comment->pin();
        }
    }

    public function updateComment($attributes, $comment): void
    {
        $comment->update([
            'body' => $attributes['comment'],
            'edited' => true
        ]);
    }

    public function deleteComment($comment): void
    {
        $comment->likes()->delete();
        $comment->delete();
    }
}
