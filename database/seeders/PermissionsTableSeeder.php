<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = collect([
            'user management', 'menu management', 'courses', 'categories', 'tags', 'deactivate user',
            'create categories', 'update categories', 'archive categories', 'delete categories',
            'create tags', 'update tags', 'archive tags', 'delete tags' ,
            'view invoice'
        ]);

        $permissions->each(function ($permission) {
            Permission::create([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        });
    }
}
