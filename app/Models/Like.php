<?php

namespace App\Models;

use App\Traits\HasFeed;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFeed;

    protected static function booted()
    {
        static::created(function ($model) {
            $model->feeds()->create([
                'user_id' => $model->user_id,
                'icon' => 'flaticon-like',
                'type' => 'liked_comment',
                'heading' => 'liked a',
            ]);
        });
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function likeable(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo();
    }
}
