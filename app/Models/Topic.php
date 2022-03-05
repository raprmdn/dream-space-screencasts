<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Topic extends Model
{
    use HasFactory, SoftDeletes;

    protected $hidden = ['pivot'];

    protected $fillable = [
        'name', 'slug', 'description',
        'picture', 'position', 'is_archived'
    ];

    /**
     * Get picture topic path.
     *
     * @return string
     */
    public function getTopicPictureAttribute() : string
    {
        return $this->picture ? "/storage/" . $this->picture : false;
    }


    /**
     * Query searching topic name.
     *
     * @param $query
     * @param $params
     *
     * @return mixed
     */
    public function scopeSearch($query, $params)
    {
        return $query->whereRaw('LOWER(name) like ?', '%' . strtolower($params) . '%')
            ->orderBy('position')->paginate(20)
            ->appends(request()->only('search'));
    }

    /**
     * Make sure topic not archived.
     *
     * @param $query
     *
     * @return mixed
     */
    public function scopeNotArchived($query)
    {
        return $query->where('is_archived', false);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function series(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Series::class, 'series_topic', 'topic_id');
    }
}
