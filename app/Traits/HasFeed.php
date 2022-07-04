<?php

namespace App\Traits;

use App\Models\ActivityFeed;

trait HasFeed
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function feeds(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(ActivityFeed::class, 'feedable');
    }
}
