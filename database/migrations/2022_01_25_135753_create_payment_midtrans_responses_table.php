<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentMidtransResponsesTable extends Migration
{
    public function up()
    {
        Schema::create('payment_midtrans_responses', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->nullable()->unique();
            $table->string('bank')->nullable();
            $table->string('va_number')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('store')->nullable();
            $table->string('permata_va_number')->nullable();
            $table->string('status_code')->nullable();
            $table->string('status_message')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('merchant_id')->nullable();
            $table->string('gross_amount')->nullable();
            $table->string('currency')->nullable();
            $table->string('transaction_time')->nullable();
            $table->string('transaction_status')->nullable();
            $table->string('fraud_status')->nullable();
            $table->string('bill_key')->nullable();
            $table->string('biller_code')->nullable();
            $table->string('payment_code')->nullable();
            $table->string('signature_key')->nullable();
            $table->string('acquirer')->nullable();
            $table->string('settlement_time')->nullable();
            $table->string('approval_code')->nullable();
            $table->json('actions')->nullable();
            $table->json('response_body')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payment_midtrans_responses');
    }
}
