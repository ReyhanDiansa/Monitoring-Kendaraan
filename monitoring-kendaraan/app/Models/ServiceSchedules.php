<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceSchedules extends Model
{
    use HasFactory;
    protected $table = 'service_schedules';
    protected $fillable = [
        'transport_id',
        'date',
        'service_description'
    ];

    public function transport()
	{
		return $this->belongsTo(Transport::class, 'transport_id');
	}
}
