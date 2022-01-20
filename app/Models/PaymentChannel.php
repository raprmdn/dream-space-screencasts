<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentChannel extends Model
{
    protected $fillable = ['payment_type_id', 'payment_channel', 'identifier_code',
        'virtual_number', 'payment_channel_owner', 'image', 'instruction', 'status', 'archived'];

    /**
     * Path storage for topic thumbnail.
     *
     * @return string
     */
    public function getImageChannelAttribute(): string
    {
        return "/storage/" . $this->image;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function paymentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(PaymentType::class, 'payment_type_id');
    }
}
