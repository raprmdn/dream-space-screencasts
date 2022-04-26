<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentMidtransResponseCollection;
use App\Models\PaymentMidtransResponse;

class PaymentMidtransResponseController extends Controller
{
    public function __invoke()
    {
        $data = PaymentMidtransResponse::latest()->search(request()->search);

        return inertia('Dashboard/Invoice/MidtransResponse/Index', [
            'midtrans_response' => new PaymentMidtransResponseCollection($data),
        ]);
    }
}
