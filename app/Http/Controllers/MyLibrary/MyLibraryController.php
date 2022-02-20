<?php

namespace App\Http\Controllers\MyLibrary;

use App\Http\Controllers\Controller;
use App\Services\SeriesService;

class MyLibraryController extends Controller
{
    protected $seriesService;

    public function __construct(SeriesService $seriesService)
    {
        $this->seriesService = $seriesService;
    }

    public function __invoke()
    {
        return inertia('Settings/MyLibrary/Index', [
            'series' => $this->seriesService->getUserPurchasedSeries()
        ]);
    }
}
