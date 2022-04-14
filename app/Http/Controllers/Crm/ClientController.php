<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ApiHelpers;
use App\Models\Respuesta;

class ClientController extends Controller
{
    public function newClient()
    {
        $res = new Respuesta;
        $company = ApiHelpers::getCompany();

        $params = [
            'first_name' => request('first_name'),
            'last_name' => request('last_name'),
            'birth_day' => request('birth_day'),
            'adress' => request('adress'),
            'id_user' => request()->session()->get('user_auth'),
            'id_company' => $company['id_company'],
            'detailContact' => request('detailContact')
        ];
        
        try{
            $sendRegister = ApiHelpers::httpRequest('post', 'client/newClient', $params);
            $res->error = $sendRegister["error"];
            $res->message = $sendRegister["message"];
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
    public function clientById()
    {
        $res = new Respuesta;

        try{
            $result = ApiHelpers::httpRequest('get', 'client/clientById', ['id_client' => request('idClient')]);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
    public function getClients()
    {
        $res = new Respuesta;
        $company = ApiHelpers::getCompany();

        try{
            $result = ApiHelpers::httpRequest('get', 'client/getClients', ['id_company' => $company['id_company']]);
            $res->data = $result['data'];
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }
        return response()->json($res->getResult());
    }
    public function getClientsActive()
    {
        $res = new Respuesta;
        $company = ApiHelpers::getCompany();

        try{
            $result = ApiHelpers::httpRequest('get', 'client/getClientsActive', ['id_company' => $company["id_company"]]);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->messaget = $e->getMessage();
        }
        return response()->json($res->getResult());
    }
    public function disableClient()
    {
        $res = new Respuesta;
        $params = ['id_client' => request('id_client'), 'enabled' => request('check')];

        try{
            $result = ApiHelpers::httpRequest('post', 'client/disabledClient', $params);
            
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }
        return response()->json($res->getResult());
    }
    public function updateClient()
    {
        $res = new Respuesta;
        $params = [
            'first_name'=> request('first_name'),
            'last_name'=> request('last_name'),
            'birth_day'=> request('birth_day'),
            'adress'=> request('adress'),
            'id_client'=> request('id_client'),
            'detailContact' => request('detailContact'),
            'id_user' => request()->session()->get('user_auth')
        ];
        try{
            $result = ApiHelpers::httpRequest('post', 'client/updateClient', $params);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }
        return response()->json($res->getResult());
    }
    public function deleteClient()
    {
        $res = new Respuesta;
        
        try{
            $result = ApiHelpers::httpRequest('post', 'client/deleteClient', ['id_client' => request('id_client')]);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
    public function saveFollowClient()
    {
        $res = new Respuesta;
        $company = ApiHelpers::getCompany();

        try{
            $params = [
                'id_client' => request('id_client'),
                'status_client' => request('status_client'),
                'option_contact' => request('option_contact'),
                'data_contact' => request('data_contact'),
                'name_contact' => request('name_contact'),
                'date_contact' => request('date_contact'),
                'comment_contact' => request('comment_contact'),
                'time_contact' => request('time_contact'),
                'id_user' => request()->session()->get('user_auth'),
                'user_contact' => request()->session()->get('name_user'),
                'id_company' => $company['id_company']
            ];

            $result = ApiHelpers::httpRequest('post', 'client/saveFollowClient', $params);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
    public function getFollowDetailByClient()
    {
        $res = new Respuesta;

        try{
            $result = ApiHelpers::httpRequest('get', 'client/getFollowDetailByClient', ["id_client" => request('idClient')]);
            $res->setResult($result);
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
}
