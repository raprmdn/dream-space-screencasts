<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMidtransConfigTable extends Migration
{
    public function up()
    {
        Schema::create('midtrans_config', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable();
            $table->boolean('environment')->nullable();
            $table->string('merchant_id')->nullable();
            $table->string('client_key')->nullable();
            $table->string('server_key')->nullable();
            $table->boolean('sanitized')->nullable();
            $table->boolean('enable_3d_secure')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('midtrans_config');
    }
}
