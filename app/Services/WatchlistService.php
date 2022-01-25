<?php

namespace App\Services;

use App\Http\Resources\SeriesCollection;
use App\Models\Series;
use Illuminate\Support\Facades\Auth;

class WatchlistService
{

    public function getUserWatchlist(): SeriesCollection
    {
        $watchlist = Auth::user()->watchlist()->oldest()->get();
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
