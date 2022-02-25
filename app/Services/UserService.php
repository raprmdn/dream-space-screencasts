<?php

namespace App\Services;

use App\Http\Resources\UserSingleResource;
use App\Traits\ImageTrait;
use Illuminate\Support\{Facades\Auth, Facades\Storage};

class UserService
{
    use ImageTrait;

    public function getCurrentUser(): UserSingleResource
    {
        $user = Auth::user();
        UserSingleResource::withoutWrapping();

        return UserSingleResource::make($user);
    }

    public function updateProfile($attributes)
    {
        if ( $attributes['email'] === Auth::user()->email ) {
            $attributes['email_verified_at'] = Auth::user()->email_verified_at;
        } else {
            $attributes['email_verified_at'] = null;
        }

        if (request()->hasFile('picture')) {
            Storage::delete(Auth::user()->profile_picture);
            $attributes['picture'] = $this->assignPicture('profile/picture', $attributes['picture'], $attributes['username']);
        } else {
            if ($attributes['picture'] === null) {
                Storage::delete(Auth::user()->profile_picture);
                $attributes['picture'] = null;
            } else {
                $attributes['picture'] = Auth::user()->profile_picture;
            }
        }

        Auth::user()->update($this->_fields($attributes));
    }

    private function _fields(array $attributes): array
    {
        return [
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'username' => $attributes['username'],
            'description' => $attributes['description'],
            'job_title' => $attributes['job'],
            'website' => $attributes['website'],
            'github' => $attributes['github'],
            'twitter' => $attributes['twitter'],
            'instagram' => $attributes['instagram'],
            'facebook' => $attributes['facebook'],
            'profile_picture' => $attributes['picture'],
            'email_verified_at' => $attributes['email_verified_at']
        ];
    }
}
