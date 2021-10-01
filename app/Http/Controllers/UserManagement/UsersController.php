<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Models\User;

class UsersController extends Controller
{
    public function index()
    {
        $users = new UserCollection(User::with('roles')->search(request()->search));
        return inertia('Dashboard/Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => request()->search
            ]
        ]);
    }
}
