<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'phone_number', 'longitude', 'latitude', 'pic_url'];

    protected $attributes = [
        'pic_url' => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        'longitude' => null,
        'latitude' => null,
    ];
}
