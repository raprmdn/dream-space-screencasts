<?php

use App\Http\Controllers\{CartController,
    Courses\SeriesController,
    Courses\VideoController,
    IndexController,
    Invoice\InvoiceController,
    Order\OrderController,
    PaymentConfiguration\PaymentChannelController,
    PaymentConfiguration\PaymentConfigurationController,
    PaymentConfiguration\PaymentTypeController,
    Topic\TopicController,
    TrashController,
    UserManagement\PermissionController,
    UserManagement\RoleController,
    UserManagement\UsersController,
    WatchlistController};
use Illuminate\Support\Facades\Route;

Route::get('/', IndexController::class)->name('home');
Route::get('topics', [TopicController::class, 'topics'])->name('topics');
Route::get('topics/{topic:slug}', [TopicController::class, 'show'])->name('topics.show');
Route::get('series', [SeriesController::class, 'findAllSeries'])->name('series');
Route::get('series/{series:slug}', [SeriesController::class, 'showDetailSeries'])->name('series.show');
Route::get('series/{series:slug}/eps/{video:episode}', [VideoController::class, 'watchVideo'])->name('watch.video');

Route::middleware('auth')->group(function () {
    Route::prefix('settings')->group(function () {
        Route::get('watchlist', [WatchlistController::class, 'index'])->name('watchlist.index');
        Route::get('invoices', [InvoiceController::class, 'invoiceMine'])->name('invoice.mine');
    });
    Route::post('add-to-carts', [CartController::class, 'create'])->name('add.carts');
    Route::post('saves', [WatchlistController::class, 'save'])->name('saves');
    Route::get('carts', [CartController::class, 'index'])->name('carts');
    Route::post('remove', [CartController::class, 'remove'])->name('remove.carts');
    Route::post('make-an-order', [OrderController::class, 'order'])->name('order');
    Route::get('invoice/{order:identifier}', [InvoiceController::class, 'show'])->name('invoice.show');
});

Route::prefix('p')->middleware(['auth', 'role:administrator|instructor'])->group(function () {
    Route::prefix('courses')->middleware('can:courses')->group(function () {
        Route::prefix('series')->group(function () {
            Route::get('', [SeriesController::class, 'index'])->name('series.index');
            Route::get('create', [SeriesController::class, 'create'])->name('series.create');
            Route::post('create', [SeriesController::class, 'store'])->name('series.store');
            Route::get('{series}/add-videos', [SeriesController::class, 'show'])->name('series.add_videos');
            Route::get('{series:slug}/edit', [SeriesController::class, 'edit'])->name('series.edit');
            Route::put('{series:slug}/edit', [SeriesController::class, 'update'])->name('series.update');
            Route::delete('{series:slug}', [SeriesController::class, 'destroy'])->name('series.delete');
        });
        Route::prefix('videos')->group(function () {
            Route::get('', [VideoController::class, 'index'])->name('videos.index');
            Route::post('', [VideoController::class, 'store'])->name('videos.store');
            Route::put('{video}', [VideoController::class, 'update'])->name('videos.update');
            Route::delete('{video}', [VideoController::class, 'destroy'])->name('videos.delete');
        });
    });
    Route::prefix('topics')->middleware(['can:topics'])->group(function () {
        Route::get('', [TopicController::class, 'index'])->name('topics.index');
        Route::post('', [TopicController::class, 'store'])->name('topics.store');
        Route::put('{topic}', [TopicController::class, 'update'])->name('topic.update');
        Route::delete('{topic}', [TopicController::class, 'destroy'])->name('topic.delete');
    });
    Route::prefix('user-management')->middleware(['can:user management'])->group(function () {
        Route::prefix('users')->group(function () {
            Route::get('', [UsersController::class, 'index'])->name('users.index');
        });
        Route::prefix('roles')->group(function () {
            Route::get('', [RoleController::class, 'index'])->name('roles.index');
            Route::post('', [RoleController::class, 'store'])->name('roles.store');
            Route::put('{role}', [RoleController::class, 'update'])->name('roles.update');
            Route::delete('{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
            Route::get('{role}', [RoleController::class, 'show'])->name('roles.view');
            Route::post('{role}/assign', [RoleController::class, 'assignRole'])->name('roles.assign');
            Route::post('{role}/{user}', [RoleController::class, 'removeRoleUser'])->name('roles.remove');
        });
        Route::prefix('permissions')->group(function () {
            Route::get('', [PermissionController::class, 'index'])->name('permissions.index');
            Route::post('', [PermissionController::class, 'store'])->name('permissions.store');
            Route::put('{permission}', [PermissionController::class, 'update'])->name('permissions.update');
            Route::delete('{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
        });
    });
    Route::prefix('invoice-management')->group(function () {
        Route::get('orders', [InvoiceController::class, 'index'])->name('orders.list');
    });
    Route::prefix('payment')->middleware(['can:payment configuration'])->group(function () {
        Route::prefix('configuration')->group(function () {
            Route::get('', [PaymentConfigurationController::class, 'index'])->name('payment.config_index');
            Route::put('status-payment-configuration', [PaymentConfigurationController::class, 'statusPaymentConfig'])->name('payment.status_config');
            Route::put('{midtrans_config}', [PaymentConfigurationController::class, 'update'])->name('payment.config_update');
        });
        Route::prefix('payment-type')->group(function () {
            Route::get('', [PaymentTypeController::class, 'index'])->name('payment.type_index');
            Route::post('', [PaymentTypeController::class, 'store'])->name('payment.type_store');
            Route::put('switching-status-payment', [PaymentTypeController::class, 'switchStatus'])->name('payment.switch_status');
            Route::put('switching-archive-payment', [PaymentTypeController::class, 'switchArchived'])->name('payment.switch_archive');
            Route::put('{payment_type}', [PaymentTypeController::class, 'update'])->name('payment.type_update');
//            Route::delete('{payment_type}', [PaymentTypeController::class, 'destroy'])->name('payment.type_destroy');
        });
        Route::prefix('payment-channel')->group(function () {
            Route::get('', [PaymentChannelController::class, 'index'])->name('payment.channel_index');
            Route::post('', [PaymentChannelController::class, 'store'])->name('payment.channel_store');
            Route::put('set-status-payment-channel', [PaymentChannelController::class, 'setStatusPaymentChannel'])->name('payment.channel_status');
            Route::put('{payment_channel:identifier_code}', [PaymentChannelController::class, 'update'])->name('payment.channel_update');
        });
    });
    Route::prefix('trash')->middleware(['can:topic'])->group(function () {
        Route::get('series', [TrashController::class, 'seriesTrashed'])->name('trash.series_index');
        Route::post('series/{series}', [TrashController::class, 'seriesRestore'])->name('trash.series_restore');
        Route::delete('series/{series}', [TrashController::class, 'seriesForce'])->name('trash.series_force');
        Route::get('videos', [TrashController::class, 'videosTrashed'])->name('trash.videos_index');
        Route::post('videos/{video}', [TrashController::class, 'videosRestore'])->name('trash.videos_restore');
        Route::delete('videos/{video}', [TrashController::class, 'videosForce'])->name('trash.videos_force');
        Route::get('topic', [TrashController::class, 'topicTrashed'])->name('trash.topic_index');
        Route::post('topic/{topic}', [TrashController::class, 'topicRestore'])->name('trash.topic_restore');
        Route::delete('topic/{topic}', [TrashController::class, 'topicForce'])->name('trash.topic_force');
    });
});


