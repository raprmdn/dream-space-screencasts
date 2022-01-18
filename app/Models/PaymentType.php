<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentType extends Model
{

    protected $fillable = ['payment_type', 'identifier', 'description', 'status', 'archived'];

}
