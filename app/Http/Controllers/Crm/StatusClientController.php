<?php

namespace App\Http\Controllers\Crm;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ApiHelpers;

class StatusClientController extends Controller
{
    public function getStatusClient()
    {
        try{
            $company = ApiHelpers::getCompany();

            if($company == null){
                return response()->json(["error" => true]);
            }
            $params = ['id_company' => $company['id_company']];

            $getStatus = ApiHelpers::httpRequest('get','statusClient/getStatusClient', $params);

            return response()->json($getStatus);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function newStatus()
    {
        try{
            $company = ApiHelpers::getCompany();

            $params = [
                'name_status' => request('name_status'),
                'description_status' => request('description_status'),
                'orden' => (int)request('orden'),
                'id_company' => $company['id_company'],
                'color' => request('color')
            ];

            $sendStatus = ApiHelpers::httpRequest('post','statusClient/newStatusClient', $params);
            
            return response()->json($sendStatus);
        }
        catch(Exception $e)
        {
            return "Exception ".$e->getMessage();
        }
    }
    public function updateStatus()
    {
        try{
            $company = ApiHelpers::getCompany();

            $params = [
                'name_status' => request('name_status'),
                'description_status' => request('description_status'),
                'orden' => (int)request('orden'),
                'id_company' => $company['id_company'],
                'id_status_client' => request('id_status_client'),
                "color" => request('color')
            ];
            
            $sendStatus = ApiHelpers::httpRequest('post', 'statusClient/updateStatusClient', $params);

            return response()->json($sendStatus);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function deleteStatus(){
        try{
            $sendIdStatus = ApiHelpers::httpRequest('post', 'statusClient/deleteStatusClient', ['id_status_client' => request('id_status_client')]);

            return response()->json($sendIdStatus);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
}
