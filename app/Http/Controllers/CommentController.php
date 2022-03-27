<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Services\CommentService;

class CommentController extends Controller
{
    protected $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    public function comment(CommentRequest $request)
    {
        $this->commentService->comment($request->all());

        return redirect()->back();
    }

    public function replies(CommentRequest $request)
    {
        $this->commentService->replies($request->all());

        return redirect()->back();
    }
}
