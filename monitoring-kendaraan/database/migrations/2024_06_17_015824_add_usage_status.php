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
            $table->enum('request_status', ['pending', 'reject', 'approve'])->default('pending')->after('usage_status');
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
            $table->dropColumn('request_status');
        });
    }
};
