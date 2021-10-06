<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Topic extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'slug', 'description',
        'picture', 'position', 'is_archived'
    ];

    public function getTopicPictureAttribute()
    {
        return "/storage/" . $this->picture;
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
        return $query->where('name', 'ilike', '%' . $params . '%')
            ->latest()->paginate(16)
            ->appends(request()->only('search'));
    }
}
