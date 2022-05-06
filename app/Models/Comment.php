<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['user_id', 'video_id', 'parent_id', 'body', 'pinned' ,'edited'];
    protected $with = ['likes'];

    /**
     * Check if user is liked the comment.
     *
     * @return bool
     */
    public function hasLiked(): bool
    {
        return (bool) $this->likes->where('user_id', auth()->id())->first();
    }

    /**
     * Auth user likes the comment.
     *
     * @return mixed
     */
    public function like()
    {
        return auth()->user()->likes()->save($this->likes()->make());
    }

    /**
     * Auth user unlike the comment.
     *
     * @return mixed
     */
    public function unlike()
    {
        return auth()->user()->likes()->where('likeable_id', $this->id)->delete();
    }

    /**
     * Pin the comment.
     *
     * @return void
     */
    public function pin(): void
    {
        $this->update([
            'pinned' => true
        ]);
    }

    /**
     * Unpin the comment.
     *
     * @return void
     */
    public function unpin(): void
    {
        $this->update([
            'pinned' => false
        ]);
    }


    /**
     * Comment parent.
     *
     * @param $query
     *
     * @return mixed
     */
    public function scopeIsParent($query)
    {
        return $query->where('parent_id', null);
    }

    /**
     * Comment not pinned.
     *
     * @param $query
     *
     * @return mixed
     */
    public function scopeNotPinned($query)
    {
        return $query->where('pinned', false);
    }

    /**
     * Comment pinned.
     *
     * @param $query
     *
     * @return mixed
     */
    public function scopePinned($query)
    {
        return $query->where('pinned', true);
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
    public function video(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Video::class, 'video_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function replies(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function likes(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

}
