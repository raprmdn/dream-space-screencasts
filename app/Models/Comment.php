<?php

namespace App\Models;

use App\Traits\HasFeed;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFeed;

    protected $fillable = ['user_id', 'video_id', 'parent_id', 'body', 'pinned', 'can_reply' ,'edited'];
    protected $with = ['likes'];

    protected static function boot()
    {
        parent::boot();
        static::created(function ($model) {
            if (!$model->parent_id) {
                $icon = 'flaticon-comment';
                $type = 'comment_on_video';
                $heading = 'comment on';
            } else {
                $icon = 'flaticon2-talk';
                $type = 'replied_to_comment';
                $heading = 'replied to';
            }

            $model->feeds()->create([
                'user_id' => $model->user_id,
                'icon' => $icon,
                'type' => $type,
                'heading' => $heading,
            ]);
        });
    }

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
     * Disable reply for the comment.
     *
     * @return void
     */
    public function disableReply(): void
    {
        $this->update([
            'can_reply' => false
        ]);
    }

    /**
     * Enable reply for the comment.
     *
     * @return void
     */
    public function enableReply(): void
    {
        $this->update([
            'can_reply' => true
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
