<?php

namespace App\Services;

use App\Models\Series;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function saveSeries($series): string
    {
        $series = Series::findOrFail($series);
        if (!Auth::user()->seriesAlreadyInWatchlist($series)) {
            Auth::user()->addSeriesToWatchlist($series);
            return 'Added to Watchlist';
        } else {
            Auth::user()->removeSeriesFromWatchlist($series);
            return 'Removed from Watchlist';
        }
    }
}
