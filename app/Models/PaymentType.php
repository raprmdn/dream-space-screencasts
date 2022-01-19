<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentType extends Model
{
    protected $fillable = ['payment_type', 'identifier', 'description', 'status', 'archived'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function paymentChannels(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PaymentChannel::class, 'payment_type_id');
    }
}
