<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ApiHelpers;

class ModulesController extends Controller
{
    public function index()
    {
        $companyData = request()->session()->get('company');
        return view('modules.index');
    }
    public function crm()
    {
        return view('crm.index');
    }
    public function configCompany()
    {
        return view('configCompany.index');
    }
    public function getModules()
    {
        try{
            $getModules = ApiHelpers::httpRequest('get', 'getModules');

            return $getModules;
        }catch(Exception $e){
            return "Exception: ".$e->getMessage();
        }
    }
}
