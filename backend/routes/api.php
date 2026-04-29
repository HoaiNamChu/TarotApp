<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\TarotController;
use App\Http\Controllers\Api\PaymentController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Booking routes
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::put('/bookings/{id}', [BookingController::class, 'update']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

    // Tarot routes
    Route::post('/tarot/readings', [TarotController::class, 'store']);
    Route::get('/tarot/readings/{bookingId}', [TarotController::class, 'getReading']);

    // Payment routes
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::get('/payments/{paymentId}', [PaymentController::class, 'show']);
    Route::get('/bookings/{bookingId}/payment', [PaymentController::class, 'getByBooking']);
});

// Public tarot demo
Route::post('/tarot/demo', [TarotController::class, 'demo']);
