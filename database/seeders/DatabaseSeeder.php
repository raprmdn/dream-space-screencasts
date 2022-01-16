<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Don't change the seeder position.
        $this->call([
            RoleAndPermissionTableSeeder::class,
            UserTableSeeder::class,
            TopicSeeder::class,
            SeriesSeeder::class,
            MidtransConfigSeeder::class,
        ]);
    }
}
