<?php

namespace Database\Seeders;

use App\Models\Series;
use Illuminate\Database\Seeder;

class SeriesSeeder extends Seeder
{
    public function run()
    {
        $series = Series::create([
            'title' => 'Series seeder for development purpose.',
            'slug' => 'series-seeder-for-development-purpose',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet dolor mollis nisi congue blandit. Proin quis lectus vitae neque posuere sagittis. Proin dignissim ante quis consequat lobortis. Maecenas vitae augue a eros blandit laoreet eu a orci. Fusce elit ipsum, maximus quis velit at, viverra dictum ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent lobortis tellus ac elit ultrices, quis dictum dolor gravida. Phasellus hendrerit mi dolor, a pretium nulla dictum eget.',
            'price' => 200000,
            'discount_price' => 100000,
            'episodes' => 10,
            'levels' => 'Advanced',
            'status' => 'Completed',
            'preview_series' => '766qmHTc2ro',
            'source_code' => 'https://github.com/raprmdn/dream-space-screencasts',
            'is_discount' => true,
        ]);
        $series->topics()->sync([1,2,4]);

        $videos = [
            [
                'title' => 'Video 1 development',
                'source' => 'pn6qUkRvlN8',
                'episode' => '1',
                'runtime' => '00:07:12',
                'is_free' => true,
            ],
            [
                'title' => 'Video 2 development',
                'source' => 'sAuEeM_6zpk',
                'episode' => '2',
                'runtime' => '00:11:12',
                'is_free' => true,
            ],
            [
                'title' => 'Video 3 development',
                'source' => 'vdPiAexMyUY',
                'episode' => '3',
                'runtime' => '00:07:31',
                'is_free' => true,
            ],
            [
                'title' => 'Video 4 development',
                'source' => 'sinPks6z2ng',
                'episode' => '4',
                'runtime' => '00:09:49',
                'is_free' => false,
            ],
            [
                'title' => 'Video 5 development',
                'source' => 'sAuEeM_6zpk',
                'episode' => '5',
                'runtime' => '00:10:02',
                'is_free' => false,
            ],
        ];
        $series->videos()->createMany($videos);
    }
}
