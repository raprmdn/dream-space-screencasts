<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use App\Services\PaymentTypeService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService, $paymentTypeService;

    public function __construct(CartService $cartService, PaymentTypeService $paymentTypeService)
    {
        $this->cartService = $cartService;
        $this->paymentTypeService = $paymentTypeService;
    }

    public function index()
    {
        return inertia('Carts', [
            'carts' => $this->cartService->carts(),
            'payment_type' => $this->paymentTypeService->getPaymentTypeWithPaymentChannels()
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
