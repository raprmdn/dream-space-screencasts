<?php

namespace App\Http\Controllers\PaymentConfiguration;

use App\Http\Controllers\Controller;
use App\Models\MidtransConfig;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentConfigurationController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function index()
    {
        return inertia('Dashboard/Payment/Index', [
            'configuration' => $this->paymentService->getMidtransConfiguration()
        ]);
    }

    public function update(Request $request, MidtransConfig $midtransConfig)
    {
        $request->validate([
            'environment' => ['in:true,false'],
            'sanitized' => ['boolean'],
            'enable_3d_secure' => ['boolean']
        ]);
        $this->paymentService->updateStatusPaymentConfiguration($request->all(), $midtransConfig);

        return redirect()->back()->with(['type' => 'success', 'message' => 'Payment Configuration has been updated.']);
    }

    public function statusPaymentConfig(Request $request)
    {
        $resp = $this->paymentService->setStatusPaymentConfiguration($request->only('status'));

        return redirect()->back()->with(['type' => 'success', 'message' => "Payment Configuration has been $resp."]);
    }
}
