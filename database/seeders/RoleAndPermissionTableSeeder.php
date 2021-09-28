<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = collect([
            'user management', 'menu management', 'courses', 'categories', 'tags', 'deactivate user',
            'create categories', 'update categories', 'archive categories', 'delete categories',
            'create tags', 'update tags', 'archive tags', 'delete tags' ,
            'view invoice', 'view dashboard'
        ]);

        $permissions->each(function ($permission) {
            Permission::create([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        });

        Role::create(['name' => 'administrator'])->givePermissionTo(Permission::all());
        Role::create(['name' => 'instructor'])->givePermissionTo([3,4,5,7,8,11,12,15,16]);
        Role::create(['name' => 'student']);
    }
}
