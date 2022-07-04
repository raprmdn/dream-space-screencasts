<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;

class LikeController extends Controller
{
    public function __invoke(Comment $comment)
    {
        if ($comment->hasLiked()) {
            $like = $comment->likes()->where('user_id', auth()->id())->where('likeable_id', $comment->id)->first();
            auth()->user()->activityFeeds()->where('feedable_id', $like->id)->where('feedable_type', Like::class)->delete();
            $comment->unlike();
        } else {
            $comment->like();
        }

        return redirect()->back();
    }
}
