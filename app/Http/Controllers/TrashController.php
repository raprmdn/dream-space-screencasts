<?php

namespace App\Http\Controllers;

use App\Services\TopicService;

class TrashController extends Controller
{
    protected $topicService;

    public function __construct(TopicService $topicService)
    {
        $this->topicService = $topicService;
    }

    public function topicTrashed()
    {
        return inertia('Dashboard/Trashed/TopicTrashed', [
            'topics' => $this->topicService->findAllOnlyTrashed(\request()->search),
            'filters' => [
                'search' => \request()->search
            ]
        ]);
    }

    public function topicRestore($topic)
    {
        $this->topicService->restore($topic);
        return back()->with(['type' => 'success', 'message' => 'Topic has been restore.']);
    }

    public function topicForce($topic)
    {
        $this->topicService->forceDelete($topic);
        return back()->with(['type' => 'success', 'message' => 'Topic has been delete permanently.']);
    }
}
