<?php

namespace App\Http\Controllers\PaymentConfiguration;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentTypeRequest;
use App\Models\PaymentType;
use App\Services\PaymentTypeService;
use Illuminate\Http\Request;

class PaymentTypeController extends Controller
{
    protected $paymentTypeService;

    public function __construct(PaymentTypeService $paymentTypeService)
    {
        $this->paymentTypeService = $paymentTypeService;
    }

    public function index()
    {
        return inertia('Dashboard/Payment/PaymentTypeIndex', [
            'payment_type' => $this->paymentTypeService->getPaymentType(),
        ]);
    }

    public function store(PaymentTypeRequest $request)
    {
        $this->paymentTypeService->save($request->all());

        return redirect()->back()->with(['type' => 'success', 'message' => 'Payment type has been added.']);
    }

    public function update(PaymentTypeRequest $request, PaymentType $paymentType)
    {
        $this->paymentTypeService->update($request->all(), $paymentType);

        return redirect()->back()->with(['type' => 'success', 'message' => 'Payment type has been updated.']);
    }

    public function destroy(PaymentType $paymentType)
    {
        $this->paymentTypeService->delete($paymentType);

        return redirect()->back()->with(['type' => 'success', 'message' => 'Payment type has been deleted.']);
    }

    public function switchStatus(Request $request)
    {
        $resp = $this->paymentTypeService->setStatusPaymentType($request->all());

        return redirect()->back()->with([
            'type' => 'success',
            'message' => "$resp->payment_type has been $resp->status."
        ]);
    }

    public function switchArchived(Request $request)
    {
        $resp = $this->paymentTypeService->setArchivedPaymentType($request->all());
        $isArchived = $resp->archived ? 'Archived' : 'Unarchived';

        return redirect()->back()->with([
            'type' => 'success',
            'message' => "$resp->payment_type has been $isArchived."
        ]);
    }
}
