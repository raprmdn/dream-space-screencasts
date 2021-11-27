<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function save(Request $request)
    {
        $message = $this->userService->saveSeries($request->series_id);
        return redirect()->back()->with(['type' => 'success', 'message' => $message]);
    }
}
