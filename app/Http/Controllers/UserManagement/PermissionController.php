<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Permissions/Index', [
            'permissions' => Permission::latest()->paginate(10),
        ]);
    }
}
