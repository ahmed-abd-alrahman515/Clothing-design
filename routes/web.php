<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\KioskController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('login'));

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/kiosk', [KioskController::class, 'index'])->name('kiosk');
    Route::get('/kiosk/sessions', [KioskController::class, 'sessions'])->name('kiosk.sessions');
    Route::get('/kiosk/branches', [KioskController::class, 'branches'])->name('kiosk.branches');
});
