<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaderBoardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('leader-board',[LeaderBoardController::class,'show'])->name('leader-board.show');
Route::get('leader-board/update',[LeaderBoardController::class,'update'])->name('leader-board.update');
