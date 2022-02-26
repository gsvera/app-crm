<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function nameUser()
    {
        try{
            $nameUser = request()->session()->get('name_user');

            return response()->json($nameUser);
        }catch(Exception $e){
            return "Exception: ". $e->getMessage();
        }
    }
}
