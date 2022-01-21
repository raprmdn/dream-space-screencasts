<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentChannel extends Model
{
    protected $fillable = ['payment_type_id', 'payment_channel', 'identifier_code',
        'virtual_number', 'payment_channel_owner', 'image', 'instruction', 'status', 'archived'];

    /**
     * Path storage for payment channel image.
     *
     * @return string
     */
    public function getImageChannelAttribute(): string
    {
        return "/storage/" . $this->image;
    }

    /**
     * Make sure payment channel not archived.
     *
     * @param $query
     *
     * @return mixed
     */
    public function scopeNotArchived($query)
    {
        return $query->where('archived', false);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function paymentType(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(PaymentType::class, 'payment_type_id');
    }
}
