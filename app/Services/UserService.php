<?php

namespace App\Services;

use App\Http\Resources\ActivityFeedResource;
use App\Http\Resources\UserSingleResource;
use App\Models\ActivityFeed;
use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use App\Traits\ImageTrait;
use Illuminate\Support\{Facades\Auth, Facades\Storage};
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Permission\Models\Role;

class UserService
{
    use ImageTrait;

    public function getCurrentUser(): UserSingleResource
    {
        $user = Auth::user();
        UserSingleResource::withoutWrapping();

        return UserSingleResource::make($user);
    }

    public function updateProfile($attributes): void
    {
        if ( $attributes['email'] !== Auth::user()->email ) Auth::user()->unverified();

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

    public function addUserByAdmin($attributes): void
    {
        $role = Role::findOrFail($attributes['roles']);
        $user = User::create([
            'name' => $attributes['name'],
            'username' => $attributes['username'],
            'email' => $attributes['email'],
            'password' => \Hash::make($attributes['password'])
        ]);
        $user->syncRoles($role);
        if ($attributes['verified_user']) $user->markEmailAsVerified();
    }

    public function makeUserEmailVerifyOrUnverified($id): string
    {
        $user = User::findOrFail($id);
        if ($user->hasVerifiedEmail()) {
            $user->unverified();
            return "$user->name email, has been mark as an unverified email.";
        } else {
            $user->markEmailAsVerified();
            return "$user->name email, has been mark as an verified email.";
        }
    }

    public function showProfile($user): UserSingleResource
    {
        $user = User::withCount(['comments', 'likes'])->where('username', $user->username)->first();
        UserSingleResource::withoutWrapping();

        return UserSingleResource::make($user);
    }

    public function getLatestUserActivity($user)
    {
        $activities = ActivityFeed::with(['feedable' => function (MorphTo $morphTo) {
            $morphTo->morphWith([
                Comment::class => [
                    'video' => function ($q) {
                        $q->with('series:id,slug')->select('id', 'series_id', 'title', 'episode');
                    },
                    'parent' => function ($q) {
                        $q->with('user:id,name,username')->select('id', 'user_id', 'video_id', 'parent_id');
                    }
                ],
                Like::class => ['likeable' => function ($q) {
                    $q->with([
                        'video' => function ($q) {
                            $q->with('series:id,slug')->select('id', 'series_id' ,'title', 'episode');
                        },
                        'user:id,name,username'
                    ]);
                }],
            ]);
        }])->where('user_id', $user->id)->latest()->paginate(20);

        return ActivityFeedResource::collection($activities);
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
        ];
    }
}
