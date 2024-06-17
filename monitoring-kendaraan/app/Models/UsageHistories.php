<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsageHistories extends Model
{
    use HasFactory;

    protected $table = 'usage_histories';

    protected $fillable = [
        'request_id',
        'fuel_consumption_id'
    ];

    public function UsageRequest()
	{
		return $this->belongsTo(UsageRequest::class, 'request_id');
	}

    public function fuel()
	{
		return $this->belongsTo(FuelConsumptions::class, 'fuel_consumption_id');
	}

}
