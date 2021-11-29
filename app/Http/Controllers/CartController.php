<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function create(Request $request)
    {
        $message = $this->cartService->create($request->series_id);

        return back()->with(['type' => 'success', 'message' => $message]);
    }
}
