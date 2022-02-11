<?php

namespace App\Services;

use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Models\Order;

class InvoiceService
{
    public function findAllWithParams($params): OrderCollection
    {
        $orders = Order::with(['user', 'channel'])->search($params);

        return new OrderCollection($orders);
    }

    public function getDetailInvoice($identifier): OrderResource
    {
        $order = Order::where('identifier', $identifier)->with(['user', 'channel'])->firstOrFail();
        return new OrderResource($order);
    }
}
