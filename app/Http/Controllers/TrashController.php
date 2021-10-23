<?php

namespace App\Http\Controllers;

use App\Models\Topic;
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
        $topic = Topic::whereId($topic)->withTrashed()->first();
        if ($topic->series()->exists()) {
            return back()->with(['type' => 'error', 'message' => 'The action is denied.']);
        }
        $this->topicService->forceDelete($topic);
        return back()->with(['type' => 'success', 'message' => 'Topic has been delete permanently.']);
    }

    public function seriesTrashed()
    {
        return inertia('Dashboard/Trashed/SeriesTrashed' , [
            'series' => $this->seriesService->findAllOnlyTrash(request()->search),
        ]);
    }
}
