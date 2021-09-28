<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\Http\Resources\PermissionResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Permission::query();

        if ($request->search) $query->where('name', 'ilike' , '%'. $request->search . '%');

        $permissions =  $query->latest()->paginate(10)->appends($request->only('search'));

        return inertia('Dashboard/Permissions/Index', [
            'permissions' => PermissionResource::collection($permissions),
            'filters' => [
                'search' => $request->search
            ]
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
        if ($permission->roles()->exists()) {
            return back()->with([
                'type' => 'error',
                'message' => 'Action deleting permission denied.'
            ], 403);
        } else {
            $permission->delete();
            return back()->with([
                'type' => 'success',
                'message' => 'Permission has been deleted.'
            ]);
        }
    }
}
