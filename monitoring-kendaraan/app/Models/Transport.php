<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transport extends Model
{
    use HasFactory;
    protected $table = 'transport';

    protected $fillable = [
        'name',
        'type',
        'ownership',
        'fuel'
    ];
 
    public function UsageRequest(){
        return $this->hasMany(UsageRequest::class, 'transport_id', 'id');
    }

    public function FuelConsumptions(){
        return $this->hasMany(FuelConsumptions::class, 'transport_id', 'id');
    }

    public function ServiceSchedules(){
        return $this->hasMany(ServiceSchedules::class, 'transport_id', 'id');
    }

}
