<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ApiHelpers;
use App\Models\Respuesta;

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
    public function getEmployeesActive()
    {
        $res = new Respuesta;
        $company = ApiHelpers::getCompany();

        try{
            $result = ApiHelpers::httpRequest('get','employees/getEmployeesActive', ["id_company" => $company["id_company"]]);
            // PRIMERO SE TIENE QUE RELACIONAR LOS EMPLEADOS CON LA COMPAÑIA ANTES DE ESTA CONSULTA
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
}
