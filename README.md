> **Note:** This application under development.


> **Note:** Sneak peek and preview available coming soon.
## Dream Space

Dream Space Screencast is online learning platform for developer, specifically building the website app.

#### Tools
- [Laravel framework](https://laravel.com)
- [Inertia](https://inertiajs.com/)
- [React](https://reactjs.org/)

#### Package
- [Midtrans](https://github.com/Midtrans/midtrans-php)
- [Spatie Role and Permission](https://spatie.be/index.php/docs/laravel-permission/v5/introduction)
- [Ziggy](https://github.com/tighten/ziggy) Laravel routes in JavaScript
- [Laravel Fortify](https://github.com/laravel/fortify) authentication backend for Laravel
- [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar), for development only
- [Inertia progress indicator](https://inertiajs.com/progress-indicators)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Lazy Load Image](https://github.com/Aljullu/react-lazy-load-image-component)
- [React YouTube](https://github.com/tjallingt/react-youtube)
- [React Select](https://react-select.com/home)

## Installation
Clone this repository,  `git clone` and `cd` into the folder. <br>

Open your terminal, and run `composer install`. <br>

Copy the .env, type in terminal `cp .env.example .env`. <br>

Configure the .env: <br> 
```
FILESYSTEM_DRIVER=public

// and another settings

MAIL_MAILER="..."
MAIL_HOST="..."
MAIL_PORT="..."
MAIL_USERNAME="..."
MAIL_PASSWORD="..."
MAIL_ENCRYPTION="..."
MAIL_FROM_ADDRESS="..."
MAIL_FROM_NAME="..."
```
> **Note**: for now this SMTP work only for reset password. Any feature like, verify email, invoice, etc. will available coming soon.

Run: 
```
php artisan key:generate
```

Open this project into your Code Editor, and then go to `database/seeders/MidtransConfigSeeder.php` file. <br>
Edit the code below to with your key, to find the key you can register on [Midtrans](https://midtrans.com) website.
```phpt
MidtransConfig::create([
    'status' => 'Disable',
    'environment' => false,
    'merchant_id' => 'Input your merchant id here',
    'client_key' => 'Input your client key here',
    'server_key' => 'Input your server key here',
    'sanitized' => true,
    'enable_3d_secure' => true,
]);
```

After setup .env, database, and etc. Run:
```
php artisan migrate --seed 
```
To run the project:
```
php artisan serve
```
