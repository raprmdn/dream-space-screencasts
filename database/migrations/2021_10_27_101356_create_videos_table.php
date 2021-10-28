<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideosTable extends Migration
{
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('series_id')->constrained('series');
            $table->string('title');
            $table->string('source')->nullable();
            $table->unsignedInteger('episode')->nullable();
            $table->string('runtime')->nullable();
            $table->boolean('is_free')->nullable();
            $table->boolean('is_archived')->default(false)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('videos');
    }
}
