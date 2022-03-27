<?php

namespace App\Http\Controllers;

use App\Models\Comment;

class LikeController extends Controller
{
    public function __invoke(Comment $comment)
    {
        if ($comment->hasLiked()) {
            $comment->unlike();
        } else {
            $comment->like();
        }

        return redirect()->back();
    }
}
