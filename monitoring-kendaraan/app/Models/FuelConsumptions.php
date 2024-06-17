<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelConsumptions extends Model
{
    use HasFactory;
    protected $table = 'fuel_consumptions';
    protected $fillable = [
        'date',
        'start_amount',
        'final_amount',
    ];

    public function history(){
        return $this->hasOne(UsageHistories::class, 'fuel_consumption_id', 'id');
    }
}
