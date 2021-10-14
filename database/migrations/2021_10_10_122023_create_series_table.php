<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeriesTable extends Migration
{
    public function up()
    {
        Schema::create('series', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('episodes')->nullable();
            $table->unsignedDouble('price')->nullable();
            $table->unsignedDouble('discount_price')->nullable();
            $table->string('levels')->nullable();
            $table->string('status')->nullable();
            $table->string('preview_series')->nullable();
            $table->string('source_code')->nullable();
            $table->string('project_demo')->nullable();
            $table->string('thumbnail')->nullable();
            $table->boolean('is_discount')->nullable()->default(false);
            $table->boolean('is_free')->nullable()->default(false);
            $table->timestamp('archived_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('series');
    }
}
