<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserSingleResource extends JsonResource
{
    /**
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        $isVerified = (bool)$this->email_verified_at;
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
            'picture' => $this->photoProfile,
            'is_verified_email' => $isVerified,
            'verified_email' => $isVerified ? $this->email_verified_at->format('d F Y, H:i') : null,
        ];
    }
}
