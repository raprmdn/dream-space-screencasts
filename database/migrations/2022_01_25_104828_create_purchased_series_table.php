<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasedSeriesTable extends Migration
{
    public function up()
    {
        Schema::create('purchased_series', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('series_id')->constrained('series');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('purchased_series');
    }
}
