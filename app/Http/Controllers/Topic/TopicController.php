<?php

namespace App\Http\Controllers\Topic;

use App\Http\Controllers\Controller;
use App\Http\Requests\TopicRequest;
use App\Http\Resources\TopicCollection;
use App\Models\Topic;
use App\Services\TopicService;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    protected $topicService;

    public function __construct(TopicService $topicService)
    {
        $this->topicService = $topicService;
    }

    public function index()
    {
        return inertia('Dashboard/Topics/Index', [
            'topics' => $this->topicService->findAll(request()->search),
            'filters' => [
                'search' => request()->search
            ]
        ]);
    }

    public function store(TopicRequest $request)
    {
        try {
            $this->topicService->save($request->all());
        } catch (\Exception $e) {
            return back()->with([
                'type' => 'error',
                'message' => 'Something went wrong. ' . $e
            ]);
        }
        return back()->with([
            'type' => 'success',
            'message' => 'Topic has been added.'
        ]);
    }
}
