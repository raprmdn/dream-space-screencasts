<?php

namespace App\Http\Controllers\PaymentConfiguration;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentChannelRequest;
use App\Models\PaymentChannel;
use App\Services\PaymentChannelService;
use App\Services\PaymentTypeService;
use Illuminate\Http\Request;

class PaymentChannelController extends Controller
{
    protected $paymentChannelService, $paymentTypeService;

    public function __construct(PaymentChannelService $paymentChannelService, PaymentTypeService $paymentTypeService)
    {
        $this->paymentChannelService = $paymentChannelService;
        $this->paymentTypeService = $paymentTypeService;
    }

    public function index()
    {
        return inertia('Dashboard/Payment/PaymentChannelIndex', [
            'payment_type' => $this->paymentTypeService->getPaymentTypeAndChannels()
        ]);
    }

    public function store(PaymentChannelRequest $request)
    {
        $this->paymentChannelService->save($request->all());

        return redirect()->back()->with(['type' => 'success', 'message'  => 'Payment Channel has been added.']);
    }

    public function update(PaymentChannelRequest $request, PaymentChannel $paymentChannel)
    {
        $this->paymentChannelService->update($request->all(), $paymentChannel);

        return redirect()->back()->with(['type' => 'success', 'message'  => 'Payment Channel has been updated.']);
    }

    public function setStatusPaymentChannel(Request $request)
    {
        $resp = $this->paymentChannelService->setStatusPaymentChannel($request->only('channel_id', 'status'));

        return redirect()->back()->with([
            'type' => 'success',
            'message'  => "Payment Channel $resp->payment_channel has been set to $resp->status."
        ]);
    }
}
