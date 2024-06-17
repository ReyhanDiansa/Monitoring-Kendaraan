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
            $table->dateTime('usage_final')->after('usage_time');
            $table->dropColumn('usage_time');
            $table->dateTime('usage_start')->after('driver_id');
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
            $table->dropColumn('usage_final');
            $table->dateTime('usage_time')->after('driver_id');
            $table->dropColumn('usage_start');
        });
    }
};
