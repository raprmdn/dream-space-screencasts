<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Services\SeriesService;
use App\Services\TopicService;

class TopicsController extends Controller
{
    protected $topicService, $seriesService;

    public function __construct(TopicService $topicService, SeriesService $seriesService)
    {
        $this->topicService = $topicService;
        $this->seriesService = $seriesService;
    }

    public function topics()
    {
        return inertia('Topics/Index', [
            'topics' => $this->topicService->findAllWithSeries()
        ]);
    }

    public function show(Topic $topic)
    {
        return inertia('Topics/List', [
            'topic' => $this->topicService->findBySlug($topic->slug),
            'series' => $this->seriesService->findByTopic($topic)
        ]);
    }
}
