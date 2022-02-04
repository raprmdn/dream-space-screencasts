<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Models\Order;
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
        //
    }

    public function show($identifier)
    {
        return inertia('Invoice', [
            'invoice' => $this->invoiceService->getDetailInvoice($identifier)
        ]);
    }
}
