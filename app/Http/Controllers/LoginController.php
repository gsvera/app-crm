<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Login;
use App\ApiHelpers;

class LoginController extends Controller
{
    public function index()
    {        
        if(request()->session()->get('user_auth')){
            return redirect('modulos');
        }
        return view('login.index');
    }
    public function login()
    {
        $params = ["email" => request('email'), 'password' => request('password')];
        $url = 'login-app';
        $method = 'post';
        
        $client = ApiHelpers::httpRequest($method, $url, $params);

        if($client['error'] == false){
            $makeLogin = new Login;
            $makeLogin->login($client['data']['id_user'], $client['data']['token'], $client['data']['name_user'], $client['data']['data_company']);
            return redirect('/modulos');
        }
        return back()->with("message", $client['message']);
    }
    public function logout()
    {
        request()->session()->forget('user_auth');
        request()->session()->forget('api_token');
        request()->session()->forget('name_user');
        request()->session()->forget('company');

        return response()->json("logout");
    }
}
