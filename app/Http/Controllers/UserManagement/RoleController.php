<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Roles/Index', [
            'roles' => Role::with(['permissions'])->withCount('users')->latest()->get(),
            'permissions' => Permission::latest()->get(),
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
}
