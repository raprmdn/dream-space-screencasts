<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartCollection;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index()
    {
        return inertia('Carts', [
            'carts' => $this->cartService->carts(),
        ]);
    }

    public function create(Request $request)
    {
        $message = $this->cartService->create($request->series_id);

        return back()->with(['type' => 'success', 'message' => $message]);
    }

    public function remove(Request $request)
    {
        $this->cartService->remove($request->series_id);

        return back()->with(['type' => 'success', 'message' => 'Removed from Carts.']);
    }
}
