<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddUserRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use App\Services\UserService;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $users = new UserCollection(User::with('roles')->search(request()->search));
        $roles = Role::latest()->get(['id', 'name']);
        return inertia('Dashboard/Users/Index', [
            'users' => $users,
            'roles' => $roles
        ]);
    }

    public function add(AddUserRequest $request)
    {
        $this->userService->addUserByAdmin($request->all());

        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'New User has been created.'
        ]);
    }

    public function emailVerify()
    {
        $message = $this->userService->makeUserEmailVerifyOrUnverified(request('user_id'));

        return redirect()->back()->with([
            'type' => 'success',
            'message' => $message
        ]);
    }
}
