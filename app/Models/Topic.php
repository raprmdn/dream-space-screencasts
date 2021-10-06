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

//    protected $appends = ['topic_picture'];

    public function getTopicPictureAttribute()
    {
        return "/storage/" . $this->picture;
    }
}
