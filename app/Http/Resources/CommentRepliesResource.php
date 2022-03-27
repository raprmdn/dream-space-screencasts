<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CommentRepliesResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $editableOrDeletable = Auth::user() && $this->user_id === Auth::user()->id;

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'video_id' => $this->video_id,
            'parent_id' => $this->parent_id,
            'comment' => $this->body,
            'likes_count' => $this->likes_count,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'username' => $this->user->username,
                'profile_picture' => $this->user->photoProfile
            ],
            'edited' => (bool) $this->edited,
            'actions' => $editableOrDeletable,
            'liked' => (bool) $this->hasLiked(),
            'commented' => $this->created_at->diffForHumans()
        ];
    }
}
