<?php

namespace App\Http\Controllers\Courses;

use App\Http\Controllers\Controller;
use App\Http\Requests\SeriesRequest;
use App\Models\Series;
use App\Models\Topic;
use App\Services\SeriesService;

class SeriesController extends Controller
{
    protected $seriesService;

    public function __construct(SeriesService $seriesService)
    {
        $this->seriesService = $seriesService;
    }

    public function index()
    {
        return inertia('Dashboard/Courses/Series/Index', [
            'series' => $this->seriesService->findAllWithParams(request()->search),
        ]);
    }

    public function create()
    {
        return inertia('Dashboard/Courses/Series/Create', [
            'topics' => Topic::orderBy('position')->get(['id', 'name']),
        ]);
    }

    public function store(SeriesRequest $request)
    {
        try {
            $this->seriesService->save($request->all());
        } catch (\Exception $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Something went wrong. ' . $e]);
        }

        return redirect()
            ->route('series.index')
            ->with(['type' => 'success', 'message' => 'Series has been created.']);
    }

    public function edit(Series $series)
    {
        return inertia('Dashboard/Courses/Series/Edit', [
            'series' => Series::whereId($series->id)->with('topics:id,name')->first(),
            'topics' => Topic::orderBy('position')->get(['id', 'name']),
        ]);
    }

    public function update(SeriesRequest $request, Series $series)
    {
        try {
            $this->seriesService->update($request->all(), $series);
        } catch (\Exception $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Something went wrong. ' . $e]);
        }

        return redirect()
            ->route('series.index')
            ->with(['type' => 'success', 'message' => 'Series has been updated.']);
    }

    public function destroy(Series $series)
    {
        $this->seriesService->delete($series);

        return redirect()
            ->route('series.index')
            ->with(['type' => 'success', 'message' => 'Series has been moved to trash.']);
    }
}
