<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Series extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'slug', 'description',
        'price', 'discount_price', 'episodes', 'levels',
        'status', 'preview_series', 'source_code', 'project_demo',
        'thumbnail', 'is_discount', 'is_free', 'archived_at'
    ];

    protected $appends = ['series_thumbnail'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'archived_at' => 'datetime',
    ];

    /**
     * Path storage for topic thumbnail.
     *
     * @return string
     */
    public function getSeriesThumbnailAttribute() : string
    {
        return "/storage/" . $this->thumbnail;
    }

    /**
     * Query searching title series.
     *
     * @param $query
     * @param $params
     *
     * @return mixed
     */
    public function scopeSearch($query, $params)
    {
        return $query->where('title', 'ilike', '%' . $params . '%')
            ->latest()->paginate(10)
            ->appends(request()->only('search'));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'series_topic', 'series_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function videos()
    {
        return $this->hasMany(Video::class, 'series_id');
    }


}
