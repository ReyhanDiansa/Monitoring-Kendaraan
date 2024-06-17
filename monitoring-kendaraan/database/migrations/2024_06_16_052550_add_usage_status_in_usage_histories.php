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
            $table->enum('usage_status', ['belum_digunakan', 'sedang_digunakan', 'sudah_digunakan'])->default('belum_digunakan')->after('usage_description');
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
            $table->dropColumn('usage_status');
        });
    }
};
