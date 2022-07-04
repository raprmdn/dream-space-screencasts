<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('activity_feeds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('icon')->nullable();
            $table->string('type')->nullable();
            $table->string('heading')->nullable();
            $table->morphs('feedable');
            $table->json('subject')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('activity_feeds');
    }
};
