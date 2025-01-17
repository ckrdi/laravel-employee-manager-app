<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::resource('/users', UserController::class)->except(['index', 'show']);

    Route::get('/units', [UnitController::class, 'index'])->name('units');
    Route::resource('/units', UnitController::class)->except(['index', 'show']);

    Route::get('/positions', [PositionController::class, 'index'])->name('positions');
    Route::resource('/positions', PositionController::class)->except(['index', 'show']);
});

require __DIR__.'/auth.php';
