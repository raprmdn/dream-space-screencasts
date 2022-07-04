<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityFeed extends Model
{
    protected $fillable = [
        'user_id', 'icon', 'type', 'heading', 'feedable_id', 'feedable_type', 'subject'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function feedable(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo();
    }
}
