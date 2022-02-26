<?php

namespace App\Http\Controllers\Crm;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ApiHelpers;

class StatusTaskController extends Controller
{
    public function newStatus()
    {
        $company = ApiHelpers::getCompany();

        $params = [
            'name_status' => request('name_status'),
            'description_status' => request('description_status'),
            'orden' => (int)request('orden'),
            'color' => request('color'),
            'id_company' => $company['id_company']
        ];

        $sendStatus = ApiHelpers::httpRequest('post','statusTask/newStatusTask', $params);
        
        return response()->json($sendStatus);
    }
    public function updateStatus()
    {
        try{
            $company = ApiHelpers::getCompany();

            $params = [
                'id_status_task' => request('id_status_task'),
                'name_status' => request('name_status'),
                'description_status' => request('description_status'),
                'orden' => (int)request('orden'),
                'color' => request('color'),
                'id_company' => $company['id_company']
            ];

            $sendStatus = ApiHelpers::httpRequest('post', 'statusTask/updateStatusTask', $params);

            return response()->json($sendStatus);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function deleteStatus()
    {
        try{
            $deleteStatus = ApiHelpers::httpRequest('post', 'statusTask/deleteStatusTask', ["id_status_task" => request('id_status_task')]);

            return response()->json($deleteStatus);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function getStatusTask()
    {
        try{
            $company = ApiHelpers::getCompany();

            if($company == null){
                return response()->json(["error" => true]);
            }
            $params = ["id_company" => $company["id_company"]];

            $getStatus = ApiHelpers::httpRequest('get', 'statusTask/getStatusTask', $params);

            return response()->json($getStatus);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
}
