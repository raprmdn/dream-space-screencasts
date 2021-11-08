<?php

namespace App\Http\Controllers;

use App\Services\TopicService;

class TopicsController extends Controller
{
    protected $topicService;

    public function __construct(TopicService $topicService)
    {
        $this->topicService = $topicService;
    }

    public function topics()
    {
        return inertia('Topics', [
            'topics' => $this->topicService->findAll()
        ]);
    }
}
