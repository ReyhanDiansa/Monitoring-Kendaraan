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
        Schema::create('request_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id');
            $table->foreignId('approver_id');
            $table->enum('status', ['pending', 'reject', 'approve'])->default('pending');
            $table->timestamps();

            $table->foreign('request_id')->references('id')->on('usage_request');
            $table->foreign('approver_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_detail');
    }
};
