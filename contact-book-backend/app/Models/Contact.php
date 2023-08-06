<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'phone_number', 'longitude', 'latitude', 'pic_url'];

    protected $attributes = [
        'pic_url' => 'profile.png',
        'longitude' => null,
        'latitude' => null,
    ];
}
