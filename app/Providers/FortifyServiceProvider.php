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
use Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController;
use Laravel\Fortify\Contracts\{LoginResponse, LogoutResponse, PasswordUpdateResponse, RegisterResponse};

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

        $this->app->instance(PasswordUpdateResponse::class, new class implements PasswordUpdateResponse {
            public function toResponse($request)
            {
                return redirect()->back()->with([
                    'type' => 'success',
                    'message' => 'Password has been changed.'
                ]);
            }
        });

        $this->app->afterResolving(EmailVerificationNotificationController::class, function ($controller) {
            $controller->middleware('throttle:verification');
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

        RateLimiter::for('verification', function (Request $request) {
            $key = $request->ip();
            $max = 1;
            $decay = 60;

            if (RateLimiter::tooManyAttempts($key, $max)) {
                $seconds = RateLimiter::availableIn($key);
                return redirect()->back()->with([
                    'type' => 'error',
                    'message' => "Too many attempts. Please try again later in $seconds seconds."
                ]);
            } else {
                RateLimiter::hit($key, $decay);
            }
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

        Fortify::verifyEmailView(function () {
            return inertia('Settings/VerifyEmail');
        });
    }
}
