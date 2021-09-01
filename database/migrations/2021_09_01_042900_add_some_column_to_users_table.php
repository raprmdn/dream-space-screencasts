<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSomeColumnToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->after('name')->unique()->nullable();
            $table->string('description')->nullable();
            $table->string('job_title')->nullable();
            $table->string('website')->nullable();
            $table->string('github')->nullable();
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('facebook')->nullable();
            $table->string('profile_picture')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('username');
            $table->dropColumn('description');
            $table->dropColumn('job_title');
            $table->dropColumn('website');
            $table->dropColumn('github');
            $table->dropColumn('instagram');
            $table->dropColumn('twitter');
            $table->dropColumn('facebook');
            $table->dropColumn('profile_picture');
        });
    }
}
