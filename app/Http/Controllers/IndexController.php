<?php

namespace App\Http\Controllers;

use App\Services\SeriesService;
use App\Services\TopicService;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    protected $topicService, $seriesService;

    public function __construct(TopicService $topicService, SeriesService $seriesService)
    {
        $this->topicService = $topicService;
        $this->seriesService = $seriesService;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return inertia('Home', [
            'topics' => $this->topicService->getTopicByValue(8),
            'recently_updated' => $this->seriesService->getRecentlyUpdated(),
        ]);
    }
}
