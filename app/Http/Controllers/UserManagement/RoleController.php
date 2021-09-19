<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Roles/Index', [
            'roles' => Role::with(['permissions'])->latest()->get(),
            'permissions' => Permission::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'guard_name' => ['required'],
            'permissions' => ['array']
        ]);

        Role::create([
            'name' => $request->name,
            'guard_name' => $request->guard_name
        ])->syncPermissions(collect($request->permissions)->pluck('id'));

        return back()->with([
            'type' => 'success',
            'message' => 'Role has been added.'
        ]);
    }

    public function update(Request $request, Role $role)
    {
        dd($request->all());
    }
}
