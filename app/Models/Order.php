<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'transaction_time' => 'datetime',
        'paid_at' => 'datetime'
    ];

    /**
     * Query searching order number.
     *
     * @param $query
     * @param $params
     *
     * @return mixed
     */
    public function scopeSearch($query, $params)
    {
        return $query->where('invoice', 'like', '%' . $params . '%')
            ->latest()->paginate(20)
            ->appends(request()->only('search'));
    }

    public function setStatusPending()
    {
        $this->attributes['status'] = 'pending';
        $this->save();
    }

    public function setStatusSuccess()
    {
        $this->attributes['status'] = 'success';
        $this->save();
    }

    public function setStatusFailed()
    {
        $this->attributes['status'] = 'failed';
        $this->save();
    }

    public function setStatusExpired()
    {
        $this->attributes['status'] = 'expired';
        $this->save();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function channel(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(PaymentChannel::class, 'payment_channel_id');
    }
}
