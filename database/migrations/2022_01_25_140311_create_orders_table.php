<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('payment_channel_id')->constrained('payment_channels');
            $table->string('invoice')->unique();
            $table->string('identifier')->unique();
            $table->json('series')->nullable();
            $table->unsignedDouble('gross_amount');
            $table->string('payment_type')->nullable();
            $table->string('channel_name')->nullable();
            $table->string('virtual_number')->nullable();
            $table->string('permata_va_number')->nullable();
            $table->string('bill_key')->nullable();
            $table->string('biller_code')->nullable();
            $table->string('payment_code')->nullable();
            $table->json('actions')->nullable();
            $table->string('status')->nullable()->default('pending');
            $table->string('status_code')->nullable();
            $table->timestamp('transaction_time')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
