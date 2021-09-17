<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TopicsController extends Controller
{
    public function topics()
    {
        return inertia('Topics');
    }
}
