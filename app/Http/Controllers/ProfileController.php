<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Services\UserService;

class ProfileController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return inertia('Settings/Profile/Index', [
            'user' => $this->userService->getCurrentUser()
        ]);
    }

    public function show(User $user)
    {
        return inertia('Profile/Show', [
            'user' => $this->userService->showProfile($user),
            'latest_activity' => $this->userService->getLatestCommentUserActivity($user)
        ]);
    }

    public function update(ProfileRequest $request)
    {
        $this->userService->updateProfile($request->all());

        return redirect()->back()->with(['type' => 'success', 'message' => 'Profile has been updated.']);
    }

    public function changePassword()
    {
        return inertia('Settings/Password/Index');
    }
}
