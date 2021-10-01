<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'name' => $this->name,
            'email' => $this->email,
            'description' => $this->description,
            'job' => $this->job_title,
            'website' => $this->website,
            'github' => $this->github,
            'instagram' => $this->instagram,
            'twitter' => $this->twitter,
            'facebook' => $this->facebook,
            'pp' => $this->profile_picture,
            'verified_email' => $this->email_verified_at,
            'joined' => $this->created_at->format('d M Y, H:i A'),
            'roles' => $this->whenLoaded('roles')
        ];
    }
}
