<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMidtransResponse extends Model
{
    protected $guarded = ['id'];

    /**
     * Query searching order number.
     *
     * @param $query
     * @param $params
     *
     * @return mixed
     */
    public function scopeSearch($query, $params): mixed
    {
        return $query->where('order_id', 'like', '%' . $params . '%')
            ->latest()->paginate(20)
            ->appends(request()->only('search'));
    }
}
