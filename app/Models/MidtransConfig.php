<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MidtransConfig extends Model
{

    protected $table = 'midtrans_config';
    protected $fillable = ['status', 'environment', 'merchant_id', 'client_key', 'server_key', 'sanitized', 'enable_3d_secure'];
    public $timestamps = false;

}
