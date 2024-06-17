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
        Schema::table('fuel_consumptions', function (Blueprint $table) {
            $table->decimal('start_amount', 8, 2)->
            after('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('fuel_consumptions', function (Blueprint $table) {
            $table->dropColumn('start_amount');
        });
    }
};
