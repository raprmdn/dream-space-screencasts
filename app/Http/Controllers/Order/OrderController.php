<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function order(Request $request)
    {
        $request->validate([
            'payment_identifier_code' => ['required']
        ]);

        try {
            $identifierURL = $this->orderService->makeAnOrder($request->payment_identifier_code);
        } catch (\Exception $exception) {
            return redirect()->back()->with([
                'type' => 'error',
                'message'  => $exception->getMessage()
            ]);
        }

        return redirect()->route('invoice.show', $identifierURL)->with([
            'type' => 'success',
            'message'  => 'Order has been created.',
        ]);
    }

    public function notificationHandler()
    {
        $this->orderService->notificationHandler();
    }
}
