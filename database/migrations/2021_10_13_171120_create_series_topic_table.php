<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeriesTopicTable extends Migration
{
    public function up()
    {
        Schema::create('series_topic', function (Blueprint $table) {
            $table->foreignId('series_id')->constrained('series')->onDelete('cascade');
            $table->foreignId('topic_id')->constrained('topics')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('series_topic');
    }
}
