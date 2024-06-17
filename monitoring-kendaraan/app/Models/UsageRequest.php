<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsageRequest extends Model
{
    use HasFactory;

    protected $table = 'usage_request';

    protected $fillable = [
        'transport_id',
        'driver_id',
        'usage_start',
        'usage_final',
        'usage_description',
        'usage_status',
        'request_status'
    ];

    public function transport()
	{
		return $this->belongsTo(Transport::class, 'transport_id');
	}

    public function driver()
	{
		return $this->belongsTo(Driver::class, 'driver_id');
	}

    public function detail(){
        return $this->hasMany(RequestDetail::class, 'request_id', 'id');
    }

    public function history(){
        return $this->hasMany(UsageHistories::class, 'request_id', 'id');
    }

}
