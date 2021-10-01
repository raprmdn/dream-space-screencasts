<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Roles/Index', [
            'roles' => Role::with(['permissions:id,name'])->withCount('users')->latest()->get(),
            'permissions' => Permission::latest()->get(['id', 'name']),
        ]);
    }

    public function show(Role $role)
    {
        $role = Role::whereId($role->id)->with(['permissions:id,name'])->withCount('users')->get();
        $users = User::role($role)->search(request()->search);
        return inertia('Dashboard/Roles/Show', [
            'role' => $role,
            'users' => new UserCollection($users),
            'filters' => [
                'search' => request()->search
            ]
        ]);
    }

    public function store(RoleRequest $request)
    {
        Role::create([
            'name' => $request->name,
            'guard_name' => $request->guard_name
        ])->syncPermissions($request->permissions);

        return back()->with([
            'type' => 'success',
            'message' => 'Role has been added.'
        ]);
    }

    public function update(RoleRequest $request, Role $role)
    {
        $role->update([
            'name' => $request->name,
            'guard_name' => $request->guard_name
        ]);
        $role->syncPermissions($request->permissions);

        return back()->with([
            'type' => 'success',
            'message' => 'Role has been updated.'
        ]);
    }

    public function destroy(Role $role)
    {
        if ($role->users()->exists()) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action deleting role denied.'
            ], 403);
        } else {
            $role->delete();
            return back()->with([
                'type' => 'success',
                'message' => 'Role has been deleted.'
            ]);
        }
    }

    public function assignRole(Request $request, Role $role)
    {
        $request->validate([
            'email' => ['required', 'email']
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user) return back()->withInput($request->only('email'))->withErrors(['email' => 'Cannot find the email address.']);

        $user->syncRoles($role);
        return back()->with([
            'type' => 'success',
            'message' => 'Role has been assigned to ' . $user->name
        ]);
    }

    public function removeRoleUser(Role $role, User $user)
    {
        $user->removeRole($role);
        return back()->with([
            'type' => 'success',
            'message' => 'User role has been removed.'
        ]);
    }
}
