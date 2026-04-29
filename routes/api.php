<?php

use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\DesignGenerationController;
use App\Http\Controllers\Api\DesignSessionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/branches', [BranchController::class, 'index']);

    Route::get('/design-sessions', [DesignSessionController::class, 'index']);
    Route::post('/design-sessions', [DesignSessionController::class, 'store']);
    Route::get('/design-sessions/{designSession}', [DesignSessionController::class, 'show']);
    Route::post('/design-sessions/{designSession}/close', [DesignSessionController::class, 'close']);

    Route::post('/design-sessions/{designSession}/generate', [DesignGenerationController::class, 'generate']);
    Route::post('/design-sessions/{designSession}/generate-paid', [DesignGenerationController::class, 'generatePaid']);
});
