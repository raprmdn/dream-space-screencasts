<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Services\InvoiceService;

class InvoiceController extends Controller
{
    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {
        $this->invoiceService = $invoiceService;
    }

    public function index()
    {
        return inertia('Dashboard/Invoice/Index', [
            'orders' => $this->invoiceService->findAllWithParams(request()->search),
        ]);
    }

    public function show($identifier)
    {
        $invoice = $this->invoiceService->getDetailInvoice($identifier);
        $this->authorize('viewInvoice', $invoice);

        return inertia('Invoice', [
            'invoice' => $invoice
        ]);
    }
}
