<?php

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

//Fix Docker cors issue
Route::group(['middleware' => 'cors'], function () {

    Route::prefix('list')->group(function () {

        Route::patch('/{id}', [\App\Http\Controllers\TodoListController::class, 'patch']);
        Route::get('/{id}/{itemId}', [\App\Http\Controllers\TodoListItemController::class, 'show']);
        Route::patch('/{id}/{$itemId}', [\App\Http\Controllers\TodoListItemController::class, 'patch']);
        Route::delete('/{id}/{$itemId}', [\App\Http\Controllers\TodoListItemController::class, 'delete']);
        Route::get('/{id}', [\App\Http\Controllers\TodoListController::class, 'show']);
        Route::delete('/{id}', [\App\Http\Controllers\TodoListController::class, 'delete']);
        Route::post('/{id}', [\App\Http\Controllers\TodoListItemController::class, 'create']);
        Route::get('/', [\App\Http\Controllers\TodoListController::class, 'showAll']);
        Route::post('/', [\App\Http\Controllers\TodoListController::class, 'create']);
    });
});
