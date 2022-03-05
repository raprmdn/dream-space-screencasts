<?php

namespace App\Services;

use App\Helpers\Helper;
use App\Http\Resources\SeriesCollection;
use App\Models\Series;
use Illuminate\Support\Facades\Auth;

class WatchlistService
{

    public function getUserWatchlist(): SeriesCollection
    {
        $watchlist = Auth::user()->watchlist()->with(['topics:id,name,slug', 'videos'])
                    ->get()->map(function ($series) {
                        Helper::castingRuntime($series);
                        unset($series->videos);
                        return $series;
                    });

        return new SeriesCollection($watchlist);
    }

    public function saveSeries($series): string
    {
        $series = Series::findOrFail($series);
        if (!Auth::user()->seriesExistsInWatchlist($series)) {
            Auth::user()->addSeriesToWatchlist($series);
            return 'Added to Watchlist';
        } else {
            Auth::user()->removeSeriesFromWatchlist($series);
            return 'Removed from Watchlist';
        }
    }
}
