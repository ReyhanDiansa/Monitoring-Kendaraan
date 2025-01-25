<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestDetail extends Model
{
    use HasFactory;
    protected $table = 'request_detail';

    protected $fillable = [
        'request_id',
        'approver_id',
        'status',
    ];

    public function request()
	{
		return $this->belongsTo(UsageRequest::class, 'request_id');
	}

    public function approver()
	{
		return $this->belongsTo(User::class, 'approver_id');
	}
}
