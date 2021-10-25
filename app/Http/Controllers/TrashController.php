<?php

namespace App\Http\Controllers;

use App\Services\SeriesService;
use App\Services\TopicService;

class TrashController extends Controller
{
    protected $topicService, $seriesService;

    public function __construct(TopicService $topicService, SeriesService $seriesService)
    {
        $this->topicService = $topicService;
        $this->seriesService = $seriesService;
    }

    public function topicTrashed()
    {
        return inertia('Dashboard/Trashed/TopicTrashed', [
            'topics' => $this->topicService->findAllOnlyTrashed(request()->search),
        ]);
    }

    public function topicRestore($topic)
    {
        $this->topicService->restore($topic);
        return back()->with(['type' => 'success', 'message' => 'Topic has been restore.']);
    }

    public function topicForce($topic)
    {
        $response = $this->topicService->forceDelete($topic);

        return $response ?
            back()->with(['type' => 'success', 'message' => 'Topic has been delete permanently.'])
            :
            back()->with(['type' => 'error', 'message' => 'Cannot delete the topic.']);
    }

    public function seriesTrashed()
    {
        return inertia('Dashboard/Trashed/SeriesTrashed' , [
            'series' => $this->seriesService->findAllOnlyTrash(request()->search),
        ]);
    }

    public function seriesRestore($series)
    {
        $this->seriesService->restore($series);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Series has been restore.']);
    }
}
