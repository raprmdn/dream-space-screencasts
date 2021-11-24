<?php

namespace App\Http\Controllers;

use App\Models\Series;
use App\Services\SeriesService;

class CourseController extends Controller
{
    protected $seriesService;

    public function __construct(SeriesService $seriesService)
    {
        $this->seriesService = $seriesService;
    }

    public function index()
    {
        return inertia('Series/Index', [
            'series' => $this->seriesService->findAll()
        ]);
    }

    public function show(Series $series)
    {
        return inertia('Series/Show', [
            'series' => $this->seriesService->findBySlug($series->slug)
        ]);
    }
}
