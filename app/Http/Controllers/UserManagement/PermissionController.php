<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Permissions/Index', [
            'permissions' => Permission::latest()->paginate(12)->onEachSide(1),
        ]);
    }

    public function store(PermissionRequest $request)
    {
        Permission::create([
            'name' => $request->name,
            'guard_name' => $request->guard_name,
        ]);

        return back()->with([
            'type' => 'success',
            'message' => 'Permissions has been added.'
        ]);
    }

    public function update(PermissionRequest $request, Permission $permission)
    {
        $permission->update([
            'name' => $request->name,
            'guard_name' => $request->guard_name
        ]);

        return back()->with([
            'type' => 'success',
            'message' => 'Permissions has been updated.'
        ]);
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        return back()->with([
            'type' => 'success',
            'message' => 'Permissions has been deleted.'
        ]);
    }
}
