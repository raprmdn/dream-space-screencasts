<?php

namespace App\Http\Controllers;

use App\Services\WatchlistService;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    protected $watchlistService;

    public function __construct(WatchlistService $watchlistService)
    {
        $this->watchlistService = $watchlistService;
    }

    public function index()
    {
        return inertia('Watchlist/Index', [
            'watchlist' => $this->watchlistService->getUserWatchlist()
        ]);
    }

    public function save(Request $request)
    {
        $message = $this->watchlistService->saveSeries($request->series_id);
        return redirect()->back()->with(['type' => 'success', 'message' => $message]);
    }
}
