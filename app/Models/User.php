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
        'name',
        'email',
        'password',
        'username', 'description', 'job_title', 'website', 'github', 'instagram', 'twitter', 'facebook', 'profile_picture'
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
     * Assigned User to role student.
     *
     */
    public static function booted()
    {
        static::creating(fn (User $user) => $user->assignRole(3));
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
}
