<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $table = 'driver';
    protected $fillable = [
        'name',
        'nip',
    ];

    public function FuelConsumptions(){
        return $this->hasMany(FuelConsumptions::class, 'driver_id', 'id');
    }

    public function UsageRequest(){
        return $this->hasMany(UsageRequest::class, 'driver_id', 'id');
    }
}
