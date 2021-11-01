<?php

use App\Http\Controllers\{Courses\SeriesController,
    Courses\VideoController,
    IndexController,
    Topic\TopicController,
    TopicsController,
    TrashController,
    UserManagement\PermissionController,
    UserManagement\RoleController,
    UserManagement\UsersController};
use Illuminate\Support\Facades\Route;

Route::get('/', IndexController::class)->name('home');
Route::get('topics', [TopicsController::class, 'topics'])->name('topics');

Route::prefix('p')->middleware(['auth', 'role:administrator|instructor'])->group(function () {
    Route::prefix('courses')->middleware('can:courses')->group(function () {
        Route::prefix('series')->group(function () {
            Route::get('', [SeriesController::class, 'index'])->name('series.index');
            Route::get('create', [SeriesController::class, 'create'])->name('series.create');
            Route::post('create', [SeriesController::class, 'store'])->name('series.store');
            Route::get('{series:slug}/add-videos', [SeriesController::class, 'show'])->name('series.add_videos');
            Route::post('{series:slug}/add-videos', [VideoController::class, 'store'])->name('series.add_videos_store');
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
