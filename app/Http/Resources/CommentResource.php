<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CommentResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $editableOrDeletable = Auth::user() && $this->user_id === Auth::user()->id;
        CommentRepliesResource::withoutWrapping();

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'video_id' => $this->video_id,
            'parent_id' => $this->parent_id,
            'comment' => $this->body,
            'replies' => CommentRepliesResource::collection($this->whenLoaded('replies')),
            'likes_count' => $this->likes_count,
            'replies_count' => $this->replies_count,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'username' => $this->user->username,
                'profile_picture' => $this->user->photoProfile
            ],
            'edited' => (bool) $this->edited,
            'liked' => (bool) $this->hasLiked(),
            'actions' => $editableOrDeletable,
            'commented' => $this->created_at->diffForHumans()
        ];
    }
}
