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
        Schema::table('usage_request', function (Blueprint $table) {

            $table->dropForeign(['driver_id']);

            $table->foreign('driver_id')
                ->references('id')
                ->on('driver')
                ->onDelete('cascade');

            $table->dropForeign(['transport_id']);

            $table->foreign('transport_id')
                ->references('id')
                ->on('transport')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('usage_request', function (Blueprint $table) {
            $table->dropForeign(['driver_id']);

            $table->foreign('driver_id')
                ->references('id')
                ->on('driver');

            $table->dropForeign(['transport_id']);

            $table->foreign('transport_id')
                ->references('id')
                ->on('transport');
        });
    }
};
