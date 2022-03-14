<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentChannelsTable extends Migration
{
    public function up()
    {
        Schema::create('payment_channels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_type_id')->nullable();
            $table->string('payment_channel')->nullable();
            $table->string('identifier_channel')->nullable();
            $table->string('type')->nullable();
            $table->string('identifier_code')->nullable();
            $table->string('virtual_number')->nullable();
            $table->string('payment_channel_owner')->nullable();
            $table->string('image')->nullable();
            $table->text('instruction')->nullable();
            $table->string('status')->nullable();
            $table->boolean('archived')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payment_channels');
    }
}
