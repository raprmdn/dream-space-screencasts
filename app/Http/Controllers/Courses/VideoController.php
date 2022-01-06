<?php

namespace App\Http\Controllers\Courses;

use App\Http\Controllers\Controller;
use App\Http\Requests\VideoRequest;
use App\Models\Series;
use App\Models\Video;
use App\Services\SeriesService;
use App\Services\VideoService;

class VideoController extends Controller
{
    protected $videoService, $seriesService;

    public function __construct(VideoService $videoService, SeriesService $seriesService)
    {
        $this->videoService = $videoService;
        $this->seriesService = $seriesService;
    }

    public function index()
    {
        return inertia('Dashboard/Courses/Videos/Index', [
            'videos' => $this->videoService->findAllWithParams(request()->search),
            'series' => $this->seriesService->getSeriesIdAndTitle()
        ]);
    }

    public function store(VideoRequest $request)
    {
        try {
            $this->videoService->save($request->all());
        } catch (\Exception $e) {
            return back()->with(['type' => 'error', 'message' => 'Something went wrong.']);
        }
        return back()->with(['type' => 'success', 'message' => 'Video has been added.']);
    }

    public function update(VideoRequest $request, Video $video)
    {
        try {
            $this->videoService->update($request->all(), $video);
        } catch (\Exception $e) {
            return back()->with(['type' => 'error', 'message' => 'Something went wrong.']);
        }
        return back()->with(['type' => 'success', 'message' => 'Video has been updated.']);
    }

    public function destroy(Video $video)
    {
        try {
            $this->videoService->delete($video);
        } catch (\Exception $e) {
            return back()->with(['type' => 'error', 'message' => 'Something went wrong.']);
        }
        return back()->with(['type' => 'success', 'message' => 'Video has been deleted.']);
    }
}
