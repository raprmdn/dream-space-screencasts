<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $editableOrDeletable = $this->user_id === $this->user->id;

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'video_id' => $this->video_id,
            'parent_id' => $this->parent_id,
            'comment' => $this->body,
            'replies' => [],
            'likes_count' => null,
            'replies_count' => null,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'username' => $this->user->username,
                'profile_picture' => $this->user->photoProfile
            ],
            'edited' => (bool) $this->edited,
            'actions' => $editableOrDeletable,
            'commented' => $this->created_at->diffForHumans()
        ];
    }
}
