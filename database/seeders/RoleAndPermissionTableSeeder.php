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
            'user management', 'menu management', 'courses', 'topics',
            'deactivate user', 'invoice management', 'view dashboard', 'trash',
            'create topics', 'update topics', 'archive topics', 'delete topics',
            'payment configuration'
        ]);

        $permissions->each(function ($permission) {
            Permission::create([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        });

        Role::create(['name' => 'administrator'])->givePermissionTo(Permission::all());
        Role::create(['name' => 'instructor'])->givePermissionTo([3, 4, 7, 9, 10, 11]);
        Role::create(['name' => 'student']);
    }
}
