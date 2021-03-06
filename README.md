> **Note:** This application under development.

> **Note:** Sneak peek and preview available coming soon.

> **Note:** Currently Midtrans payment only available for BRI, BCA, BNI, Mandiri, Permata, Gopay, Alfamart, Indomaret.

> **Note:** Manual Payment is currently not available.


## Dream Space

Dream Space Screencast is online learning platform for developer, specifically building the website app.

#### Tools
- [Laravel framework](https://laravel.com)
- [Inertia](https://inertiajs.com/)
- [React](https://reactjs.org/)

#### Package
- [Socialite](https://laravel.com/docs/9.x/socialite), Google Authentication.
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
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [Remark GFM](https://github.com/remarkjs/remark-gfm)

## Installation
Clone this repository.

```shell
git clone https://github.com/raprmdn/dream-space-screencasts.git
```

Then, `cd` into the folder.

Open your terminal, and run
```shell
composer install
```

Copy the .env, type in terminal
```shell
cp .env.example .env
```

Configure the .env: <br> 
```php
# Setup SMTP.
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME="..."
MAIL_PASSWORD="..."
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="..."
MAIL_FROM_NAME="${APP_NAME}"

# Setup Google Login.
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT=
```
> **Note**: for now this SMTP work only for reset password, verify email, resend email verification. Any feature like, invoice, etc. will available coming soon.

Run: 
```shell
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
Create symlink in Laravel by execute
```shell
php artisan storage:link
```
After setup .env, database, and etc. Run:
```shell
php artisan migrate --seed 
```
To run the project:
```shell
php artisan serve
```

To start a queue worker and process new jobs. Run the worker using terminal:
```shell
php artisan queue:work
```

Login account:
```
email    : admin@dreamspace.com
password : 123123123
```
Then, if you want to edit the React file, install NPM file by run:
```shell
npm install
```
then 
```shell
# If You using NPM
npm run watch

# If You using Yarn
yarn watch
```
