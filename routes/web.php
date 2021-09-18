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
        Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
        Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
        Route::post('permissions', [PermissionController::class, 'store'])->name('permissions.store');
        Route::put('permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
        Route::delete('permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
    });
});
