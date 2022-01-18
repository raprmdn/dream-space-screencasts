<?php

namespace App\Http\Controllers\PaymentConfiguration;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentConfigRequest;
use App\Models\MidtransConfig;
use App\Services\PaymentConfigService;
use Illuminate\Http\Request;

class PaymentConfigurationController extends Controller
{
    protected $paymentConfigService;

    public function __construct(PaymentConfigService $paymentConfigService)
    {
        $this->paymentConfigService = $paymentConfigService;
    }

    public function index()
    {
        return inertia('Dashboard/Payment/Index', [
            'configuration' => $this->paymentConfigService->getMidtransConfiguration()
        ]);
    }

    public function update(PaymentConfigRequest $request, MidtransConfig $midtransConfig)
    {
        $this->paymentConfigService->updatePaymentConfiguration($request->all(), $midtransConfig);

        return redirect()->back()->with(['type' => 'success', 'message' => 'Payment Configuration has been updated.']);
    }

    public function statusPaymentConfig(Request $request)
    {
        $resp = $this->paymentConfigService->setStatusPaymentConfiguration($request->only('status'));

        return redirect()->back()->with(['type' => 'success', 'message' => "Payment Configuration has been $resp."]);
    }
}
