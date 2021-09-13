<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Dream Space',
            'email' => 'admin@dreamspace.com',
            'email_verified_at' => now(),
            'username' => 'dream.space',
            'description' => 'Hey there, currently working for developing Dream Space platform!',
            'job_title' => 'Web Developer',
            'website' => 'dreamspace.com',
            'password' => bcrypt('123123123')
        ]);
    }
}
