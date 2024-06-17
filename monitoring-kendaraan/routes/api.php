<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\FuelConsumptionsController;
use App\Http\Controllers\ServiceSchedulesController;
use App\Http\Controllers\TransportController;
use App\Http\Controllers\UsageHistoriesController;
use App\Http\Controllers\UsageRequestController;
use App\Http\Controllers\UserController;
use App\Models\ServiceSchedules;
use App\Models\UsageHistories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'profile']);
    
    Route::prefix("driver")->group(function () {
        Route::get("/", [DriverController::class, 'index']);
        Route::get("/{id}", [DriverController::class, 'show']);
        Route::post('/create', [DriverController::class, 'store']);
        Route::put('/update/{id}', [DriverController::class, 'update']);
        Route::delete('/delete/{id}', [DriverController::class, 'destroy']);
        Route::get("/get/name", [DriverController::class, 'getName']);
        Route::post("/filter/{keyword}", [DriverController::class, 'filterData']);
        Route::post("/get-data/for-export", [DriverController::class, 'exportData']);
    });
    
    Route::prefix("transport")->group(function () {
        Route::get("/", [TransportController::class, 'index']);
        Route::get("/{id}", [TransportController::class, 'show']);
        Route::post('/create', [TransportController::class, 'store']);
        Route::put('/update/{id}', [TransportController::class, 'update']);
        Route::delete('/delete/{id}', [TransportController::class, 'destroy']);
        Route::get("/get/name", [TransportController::class, 'getName']);
        Route::post("/filter/{keyword}", [TransportController::class, 'filterData']);
        Route::post("/get-data/for-export", [TransportController::class, 'exportData']);

    });
    
    Route::prefix("usage-request")->group(function () {
        Route::get("/", [UsageRequestController::class, 'index']);
        Route::get("/{id}", [UsageRequestController::class, 'show']);
        Route::post('/create', [UsageRequestController::class, 'store']);
        Route::put('/update/{id}', [UsageRequestController::class, 'update']);
        Route::delete('/delete/{id}', [UsageRequestController::class, 'destroy']);
        Route::get('/approver/{id}', [UsageRequestController::class, 'showForApprover']);
        Route::post('/approve-reject/{id}', [UsageRequestController::class, 'ApproveReject']);
        Route::put('/update/usage-status/{id}', [UsageRequestController::class, 'UpdateUsageStatus']);
        Route::post("/filter/{keyword}", [UsageRequestController::class, 'filterData']);
        Route::post("/get-data/for-export", [UsageRequestController::class, 'exportData']);
        Route::post('/approver/getAll', [UsageRequestController::class, 'getAllForApprover']);
        Route::post('/filter/for-approver/{keyword}', [UsageRequestController::class, 'filterDataForApprover']);
        Route::post('/get-data/for-export/for-approver', [UsageRequestController::class, 'exportDataForApprover']);
    });
    
    Route::prefix("user")->group(function () {
        Route::get("/", [UserController::class, 'index']);
        Route::get("/{id}", [UserController::class, 'show']);
        Route::post('/create', [UserController::class, 'store']);
        Route::put('/update/{id}', [UserController::class, 'update']);
        Route::delete('/delete/{id}', [UserController::class, 'destroy']);
        Route::get("/get/name", [UserController::class, 'getName']);
        Route::post("/filter/{keyword}", [UserController::class, 'filterData']);
        Route::post("/get-data/for-export", [UserController::class, 'exportData']);
    });
    
    Route::prefix("fuel-consumption")->group(function () {
        Route::get("/", [FuelConsumptionsController::class, 'index']);
        Route::get("/{id}", [FuelConsumptionsController::class, 'show']);
        Route::post('/create', [FuelConsumptionsController::class, 'store']);
        Route::put('/update/{id}', [FuelConsumptionsController::class, 'update']);
        Route::delete('/delete/{id}', [FuelConsumptionsController::class, 'destroy']);
        Route::post("/filter/{keyword}", [FuelConsumptionsController::class, 'filterData']);
        Route::post("/get-data/for-export", [FuelConsumptionsController::class, 'exportData']);
        Route::get('/getDataDaily/forChart', [FuelConsumptionsController::class, 'getDailyData']);
        Route::get('/getDataMonthly/forChart', [FuelConsumptionsController::class, 'getMonthlyData']);
    });
    
    Route::prefix("service-schedule")->group(function () {
        Route::get("/", [ServiceSchedulesController::class, 'index']);
        Route::get("/{id}", [ServiceSchedulesController::class, 'show']);
        Route::post('/create', [ServiceSchedulesController::class, 'store']);
        Route::put('/update/{id}', [ServiceSchedulesController::class, 'update']);
        Route::delete('/delete/{id}', [ServiceSchedulesController::class, 'destroy']);
        Route::post("/filter/{keyword}", [ServiceSchedulesController::class, 'filterData']);
        Route::post("/get-data/for-export", [ServiceSchedulesController::class, 'exportData']);
        Route::post("/get-data/service-today", [ServiceSchedulesController::class, 'ServiceToday']);
    });
    
    Route::prefix("usage-histories")->group(function () {
        Route::get("/", [UsageHistoriesController::class, 'index']);
        Route::get("/{id}", [UsageHistoriesController::class, 'show']);
        Route::post('/create', [UsageHistoriesController::class, 'store']);
        Route::put('/update/{id}', [UsageHistoriesController::class, 'update']);
        Route::delete('/delete/{id}', [UsageHistoriesController::class, 'destroy']);
        Route::post('/create/laporan-pemakaian/{id}', [UsageHistoriesController::class, 'pelaporanPemakaian']);
        Route::post("/filter/{keyword}", [UsageHistoriesController::class, 'filterData']);
        Route::post("/get-data/for-export", [UsageHistoriesController::class, 'exportData']);
        Route::get('/getHistoryDaily/forChart', [UsageHistoriesController::class, 'getDailyCounts']);
        Route::get('/getHistoryMonthly/forChart', [UsageHistoriesController::class, 'getMonthlyCounts']);
    });
});


