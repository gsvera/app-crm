<?php

namespace App\Http\Controllers\Crm;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ApiHelpers;

class TypeProductController extends Controller
{
    public function newTypeProduct()
    {
        try{
            $company = ApiHelpers::getCompany();

            $params = [
                "name_tipo" => request('name_tipo'),
                "id_company" => $company["id_company"]
            ];

            $sendType = ApiHelpers::httpRequest('post', 'typeProduct/newTypeProduct', $params);

            return response()->json($sendType);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function getStatus()
    {
        try{
            $company = ApiHelpers::getCompany();

            $id_company = ["id_company" => $company["id_company"]];

            $getData = ApiHelpers::httpRequest("get", "typeProduct/getTypeProduct", $id_company);

            return response()->json($getData);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function updateTypeProduct()
    {
        try{
            $company = ApiHelpers::getCompany();

            $params = [
                "id_company" => $company["id_company"],
                "id_tipo_product" => request('id_tipo'),
                "name_tipo" => request('name_tipo')
            ];

            $sendType = ApiHelpers::httpRequest("post", "typeProduct/updateTypeProduct", $params);

            return response()->json($sendType);
        }
        catch(Exception $e)
        {
            return "Exception: " . $e->getMessage();
        }
    }
    public function deleteTypeProduct()
    {
        try{
            $deleteType = ApiHelpers::httpRequest("post", "typeProduct/deleteTypeProduct", ["id_tipo" => request('id_tipo')]);
            return response()->json($deleteType);
        }catch(Exception $e)
        {
            return "Exception: ". $e->getMessage();
        }
    }
}
