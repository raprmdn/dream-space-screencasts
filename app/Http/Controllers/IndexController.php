<?php

namespace App\Http\Controllers;

use App\Services\TopicService;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    protected $topicService;

    public function __construct(TopicService $topicService)
    {
        $this->topicService = $topicService;
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
        ]);
    }
}
