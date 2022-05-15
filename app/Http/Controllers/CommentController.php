<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
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

    public function pin()
    {
        $this->commentService->pinComment(request('comment_id'));

        return redirect()->back();
    }

    public function update(CommentRequest $request, Comment $comment)
    {
        $this->commentService->updateComment($request->all(), $comment);

        return redirect()->back();
    }

    public function delete(Comment $comment)
    {
        $this->commentService->deleteComment($comment);

        return redirect()->back();
    }

    public function disableReply()
    {
        $this->commentService->disableReply(request('comment_id'));

        return redirect()->back();
    }
}
