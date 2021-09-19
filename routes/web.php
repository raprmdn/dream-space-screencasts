<?php

use App\Http\Controllers\{IndexController,
    TopicsController,
    UserManagement\PermissionController,
    UserManagement\RoleController};
use Illuminate\Support\Facades\Route;

Route::get('/', IndexController::class)->name('home');
Route::get('topics', [TopicsController::class, 'topics'])->name('topics');

Route::prefix('p')->middleware('auth')->group(function () {
    Route::prefix('user-management')->group(function () {
        Route::prefix('roles')->group(function () {
            Route::get('', [RoleController::class, 'index'])->name('roles.index');
            Route::post('', [RoleController::class, 'store'])->name('roles.store');
            Route::put('{role}', [RoleController::class, 'update'])->name('roles.update');
        });
        Route::prefix('permissions')->group(function () {
            Route::get('', [PermissionController::class, 'index'])->name('permissions.index');
            Route::post('', [PermissionController::class, 'store'])->name('permissions.store');
            Route::put('{permission}', [PermissionController::class, 'update'])->name('permissions.update');
            Route::delete('{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
        });
    });
});
