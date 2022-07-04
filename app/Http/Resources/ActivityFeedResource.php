<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityFeedResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        if ($this->feedable_type === 'App\Models\Comment') {
            $feedable = [
                'id' => $this->feedable->id,
                'user_id' => $this->feedable->user_id,
                'video_id' => $this->feedable->video_id,
                'parent_id' => $this->feedable->parent_id,
                'body' => $this->feedable->body,
                'video' => [
                    'id' => $this->feedable->video->id,
                    'title' => $this->feedable->video->title,
                    'episode' => $this->feedable->video->episode,
                    'url' => route('watch.video', [$this->feedable->video->series->slug, $this->feedable->video->episode])
                ],
                'user' => isset($this->feedable->parent) ? [
                    'id' => $this->feedable->parent->user->id,
                    'name' => $this->feedable->parent->user->name,
                    'url' => route('profile.show', $this->feedable->parent->user->username),
                ] : null
            ];
        } else {
            $feedable = [
                'id' => $this->feedable->likeable->id,
                'user_id' => $this->feedable->likeable->user_id,
                'video_id' => $this->feedable->likeable->video_id,
                'parent_id' => $this->feedable->likeable->parent_id,
                'body' => $this->feedable->likeable->body,
                'video' => [
                    'id' => $this->feedable->likeable->video->id,
                    'title' => $this->feedable->likeable->video->title,
                    'episode' => $this->feedable->likeable->video->episode,
                    'url' => route('watch.video', [$this->feedable->likeable->video->series->slug, $this->feedable->likeable->video->episode])
                ],
                'user' =>  [
                    'id' => $this->feedable->likeable->user->id,
                    'name' => $this->feedable->likeable->user->name,
                    'url' => route('profile.show', $this->feedable->likeable->user->username),
                ],
            ];
        }

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'icon' => $this->icon,
            'type' => $this->type,
            'heading' => $this->heading,
            'feedable_id' => $this->feedable_id,
            'feedable_type' => $this->feedable_type,
            'subject' => $this->subject,
            'created_at' => $this->created_at->format('Y-m-d H:i'),
            'diffForHumans' => $this->created_at->diffForHumans(),
            'feedable' => $feedable,
        ];
    }
}
