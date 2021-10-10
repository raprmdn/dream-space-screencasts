<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            ['name' => 'Laravel', 'slug' => 'laravel', 'description' => 'laravel description', 'position' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'React', 'slug' => 'react', 'description' => 'react description', 'position' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Vue', 'slug' => 'vue', 'description' => 'vue description', 'position' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Inertia', 'slug' => 'inertia', 'description' => 'inertia description', 'position' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'PHP', 'slug' => 'php', 'description' => 'php description', 'position' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'JavaScript', 'slug' => 'javascript', 'description' => 'javascript description', 'position' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Laravel Livewire', 'slug' => 'laravel-livewire', 'description' => 'laravel-livewire description', 'position' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Tailwind CSS', 'slug' => 'tailwind-css', 'description' => 'tailwind-css description', 'position' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Laravel Mix', 'slug' => 'laravel-mix', 'description' => 'laravel-mix description', 'position' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bootstrap', 'slug' => 'bootstrap', 'description' => 'bootstrap description', 'position' => 10, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Git', 'slug' => 'git', 'description' => 'git description', 'position' => 11, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'HTML', 'slug' => 'html', 'description' => 'html description', 'position' => 12, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'CSS', 'slug' => 'css', 'description' => 'css description', 'position' => 13, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Laravel Forge', 'slug' => 'laravel-forge', 'description' => 'laravel-forge description', 'position' => 14, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'TypeScript', 'slug' => 'typescript', 'description' => 'typescript description', 'position' => 15, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Angular', 'slug' => 'angular', 'description' => 'angular description', 'position' => 16, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Symfony', 'slug' => 'symfony', 'description' => 'symfony description', 'position' => 17, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Redis', 'slug' => 'redis', 'description' => 'redis description', 'position' => 18, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'MySQL', 'slug' => 'mysql', 'description' => 'mysql description', 'position' => 19, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'PHPStorm', 'slug' => 'phpstorm', 'description' => 'phpstorm description', 'position' => 20, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Visual Studio Code', 'slug' => 'visual-studio-code', 'description' => 'visual-studio-code description', 'position' => 21, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Sublime', 'slug' => 'sublime', 'description' => 'sublime description', 'position' => 22, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Tools', 'slug' => 'tools', 'description' => 'tools description', 'position' => 23, 'created_at' => now(), 'updated_at' => now()],
        ])->each(function ($topic) {
            \DB::table('topics')->insert($topic);
        });
    }
}
