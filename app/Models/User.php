<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name', 'email', 'password',
        'username', 'description', 'job_title',
        'website', 'github', 'instagram', 'twitter',
        'facebook', 'profile_picture'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'roles',
        'permissions',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get profile picture path.
     *
     * @return string
     */
    public function getPhotoProfileAttribute() : string
    {
        return $this->profile_picture ? "/storage/" . $this->profile_picture : false;
    }

    /**
     * Assigned User to role student.
     *
     */
    public static function booted()
    {
        static::creating(function (User $user) {
            return $user->assignRole(3);
        });
    }

    /**
     * Query search name.
     *
     * @param $query
     * @param $params
     *
     * @return mixed
     */
    public function scopeSearch($query, $params)
    {
        return $query->where(function ($query) use($params) {
                    $query->where('name', 'ilike', '%' . $params . '%')
                        ->orWhere('email', 'ilike', '%' . $params . '%');
                    })
                    ->latest()->paginate(16)
                    ->appends(request()->only('search'));
    }


    /**
     * Make user email unverified.
     *
     * @return void
     */
    public function unverified()
    {
        $this->forceFill([
            'email_verified_at' => null
        ])->save();
    }

    /**
     * User adding series to watchlist
     *
     * @param Series $series
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function addSeriesToWatchlist(Series $series): \Illuminate\Database\Eloquent\Model
    {
        return $this->watchlist()->save($series);
    }

    /**
     * User removing series from the watchlist
     *
     * @param Series $series
     *
     * @return bool
     */
    public function removeSeriesFromWatchlist(Series $series): bool
    {
        return $this->watchlist()->detach($series);
    }

    /**
     * Check series exists in watchlist
     *
     * @param $series
     *
     * @return bool
     */
    public function seriesExistsInWatchlist($series): bool
    {
        return (bool) $this->watchlist()->find($series);
    }

    /**
     * Added series to carts.
     *
     * @param Series $series
     *
     * @return Cart|\Illuminate\Database\Eloquent\Model
     */
    public function addToCarts(Series $series)
    {
        $price = !$series->discount_price ? $series->price : $series->discount_price;

        return $this->carts()->create([
            'series_id' => $series->id,
            'price' => $price
        ]);
    }

    /**
     * Removing series in carts.
     *
     * @param Series $series
     *
     * @return bool|null
     */
    public function removeFromCarts(Series $series): ?bool
    {
        return $this->carts()->where('series_id', $series->id)->first()->delete();
    }

    /**
     * Check if series exists in carts.
     *
     * @param $series
     *
     * @return bool
     */
    public function existsInCarts($series): bool
    {
        return (bool) $this->carts()->where('series_id', $series)->first();
    }

    /**
     * User purchasing the series.
     *
     * @param $series
     *
     * @return void
     */
    public function purchasing($series): void
    {
        $this->purchases()->syncWithoutDetaching($series);
    }

    /**
     * Check if User has already purchased the series.
     *
     * @param $series
     *
     * @return bool
     */
    public function hasPurchased($series): bool
    {
        return (bool) $this->purchases->find($series);
    }

    /*
     *  Table Relation.
     */

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function watchlist(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Series::class, 'user_watchlist', 'user_id', 'series_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function carts(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Cart::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function purchases(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Series::class, 'purchased_series', 'user_id', 'series_id')->withTimestamps();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Order::class, 'user_id');
    }

}
