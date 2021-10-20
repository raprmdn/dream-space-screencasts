<?php

use App\Http\Controllers\{Courses\SeriesController,
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
            Route::get('{series:slug}/edit', [SeriesController::class, 'edit'])->name('series.edit');
            Route::put('{series:slug}/edit', [SeriesController::class, 'update'])->name('series.update');
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
        Route::get('topic', [TrashController::class, 'topicTrashed'])->name('trash.topic_index');
        Route::put('topic/{topic}', [TrashController::class, 'topicRestore'])->name('trash.topic_restore');
        Route::delete('topic/{topic}', [TrashController::class, 'topicForce'])->name('trash.topic_force');
    });
});
