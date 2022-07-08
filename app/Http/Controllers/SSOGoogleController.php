<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SSOGoogleController extends Controller
{
    public function google()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        $user = Socialite::driver('google')->user();
        $nickname = explode('@', $user->getEmail())[0] . Str::random(2);

        $user = User::firstOrCreate([
            'email' => $user->getEmail(),
        ], [
            'email' => $user->getEmail(),
            'name' => $user->getName(),
            'username' => $nickname,
            'password' => bcrypt(Str::random()),
            'provider' => 'google',
            'provider_id' => $user->getId(),
        ]);

        $user->forceFill([
            'email_verified_at' => now(),
        ])->save();
        auth()->login($user);

        return redirect()->route('home');
    }
}
