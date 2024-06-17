<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usage_request', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transport_id');
            $table->foreignId('driver_id');
            $table->dateTime('usage_time');
            $table->string('usage_description');
            $table->timestamps();

            $table->foreign('transport_id')->references('id')->on('transport');
            $table->foreign('driver_id')->references('id')->on('driver');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usage_request');
    }
};
