<?php

namespace App\Http\Controllers;

use App\Models\Topic;
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
        return inertia('Topics/Index', [
            'topics' => $this->topicService->findAll()
        ]);
    }

    public function show(Topic $topic)
    {
        return inertia('Topics/List', [
            'topic' => $this->topicService->findBySlug($topic->slug)
        ]);
    }
}
