<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'series_id', 'title', 'source', 'episode', 'runtime', 'is_free', 'is_archived'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function series(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Series::class, 'series_id');
    }

    /**
     * Query searching videos title.
     *
     * @param $query
     * @param $params
     *
     * @return mixed
     */
    public function scopeSearch($query, $params)
    {
        return $query->where('title', 'ilike', '%' . $params . '%')
            ->latest()->paginate(20)
            ->appends(request()->only('search'));
    }
}
