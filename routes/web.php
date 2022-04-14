<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ModulesController;
use App\Http\Controllers\UsuarioController;

use App\Http\Controllers\Crm\StatusClientController;
use App\Http\Controllers\Crm\StatusTaskController;
use App\Http\Controllers\Crm\TypeProductController;
use App\Http\Controllers\Crm\FolioController;
use App\Http\Controllers\Crm\ClientController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LoginController::class, 'index']);
Route::post('login', [LoginController::class, 'login'])->name('login');
Route::get('logout', [LoginController::class, 'logout']);

Route::group(['middleware' => 'authUser'], function(){
    Route::get('/modulos', [ModulesController::class, 'index']);
    Route::get('/crm', [ModulesController::class, 'crm']);
    Route::get('/configuracion-company', [ModulesController::class, 'configCompany']);
});

Route::group(['prefix' => 'funct', 'middleware' => 'authUser'], function(){
    // FUNCTION OF COMPONENT USER
    Route::get('nameUser', [UsuarioController::class, 'nameUser']);
    Route::get('getEmployeesActive', [UsuarioController::class, 'getEmployeesActive']);

    //FUNCTION OF COMPONEN MODULES
    Route::get('modules', [ModulesController::class, 'getModules']);

    // FUNCTIONS TO COMPONENT OF STATUS CLIENT
    Route::post('newStatusClient', [StatusClientController::class, 'newStatus']);
    Route::post('updateStatusClient', [StatusClientController::class, 'updateStatus']);
    Route::post('deleteStatusClient', [StatusclientController::class, 'deleteStatus']);
    Route::get('getStatusClient', [StatusClientController::class, 'getStatusClient']);

    //FUNCTIONS TO COMPONENT OF STATUS TASK
    Route::post('newStatusTask', [StatusTaskController::class, 'newStatus']);
    Route::get('getStatusTask', [StatusTaskController::class, 'getStatusTask']);
    Route::post('updateStatusTask', [StatusTaskController::class, 'updateStatus']);
    Route::post('deleteStatusTask', [StatusTaskController::class, 'deleteStatus']);

    //FUNCTION TO COMPONENT OF TYPE PRODUCT
    Route::post('newTypeProduct', [TypeProductController::class, 'newTypeProduct']);
    Route::get('getTypeProduct', [TypeProductController::class, 'getStatus']);
    Route::post('updateTypeProduct', [TypeProductController::class, 'updateTypeProduct']);
    Route::post('deleteTypeProduct', [TypeProductController::class, 'deleteTypeProduct']);

    //FUNCTIONS TO COMPONENT OF FOLIOS
    Route::get('getFolios', [FolioController::class, 'getFolios']);
    Route::post('updateFolio', [FolioController::class, 'updateFolio']);

    //FUNCTION TO COMPONENT OF CLIENTS
    Route::post('newClient', [ClientController::class, 'newClient']);
    Route::get('getClients', [ClientController::class, 'getClients']);
    Route::get('getClientsActive', [ClientController::class, 'getClientsActive']);
    Route::post('disableClient', [ClientController::class, 'disableClient']);
    Route::post('updateClient', [ClientController::class, 'updateClient']);
    Route::post('deleteClient', [ClientController::class, 'deleteClient']);
    Route::get('clientById', [ClientController::class, 'clientById']);
    Route::post('saveFollowClient', [ClientController::class, 'saveFollowClient']);
    Route::get('getFollowDetailByClient', [ClientController::class, 'getFollowDetailByClient']);
});