<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Contracts\{LoginResponse, LogoutResponse, RegisterResponse};

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->instance(LoginResponse::class, new class implements LoginResponse {
            public function toResponse($request)
            {
                return redirect()->intended(route('home'))->with([
                    'type' => 'success',
                    'message' => 'You have been logged in.'
                ]);
            }
        });
        $this->app->instance(LogoutResponse::class, new class implements LogoutResponse {
            public function toResponse($request)
            {
                return redirect()->route('home')->with([
                    'type' => 'success',
                    'message' => 'You have been logged out.'
                ]);
            }
        });


        $this->app->instance(RegisterResponse::class, new class implements RegisterResponse {
            public function toResponse($request)
            {
                return redirect()->route('home')->with([
                    'type' => 'success',
                    'message' => 'Successfully registered. Please confirm your email address.'
                ]);
            }
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)->by($request->email.$request->ip());
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        Fortify::loginView(function () {
            return inertia('Auth/Login');
        });

        Fortify::registerView(function () {
            return inertia('Auth/Register');
        });

        Fortify::requestPasswordResetLinkView(function () {
            return inertia('Auth/ForgotPassword');
        });

        Fortify::resetPasswordView(function ($request) {
            return inertia('Auth/ResetPassword', [
                'request' => [
                    'email' => $request->email,
                    'token' => $request->route('token')
                ]
            ]);
        });
    }
}
