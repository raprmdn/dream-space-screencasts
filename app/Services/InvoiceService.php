<?php

namespace App\Services;

use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class InvoiceService
{
    public function findAllWithParams($params): OrderCollection
    {
        $orders = Order::with(['user', 'channel'])->search($params);

        return new OrderCollection($orders);
    }

    public function getAuthUserInvoice(): OrderCollection
    {
        $invoices = Auth::user()->orders()->with(['channel', 'user'])->latest()->paginate(10);

        return new OrderCollection($invoices);
    }

    public function getDetailInvoice($identifier)
    {
        return Order::where('identifier', $identifier)->with(['user', 'channel'])->firstOrFail();
    }
}
