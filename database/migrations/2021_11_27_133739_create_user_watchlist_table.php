<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserWatchlistTable extends Migration
{
    public function up()
    {
        Schema::create('user_watchlist', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('series_id')->constrained('series')->cascadeOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_watchlist');
    }
}
