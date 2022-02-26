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
            'email' => request('email'),
            'phone_number' => request('phone_number'),
            'whatsapp_number' => request('whatsapp_number'),
            'birth_day' => request('birth_day'),
            'adress' => request('adress'),
            'id_user' => request()->session()->get('user_auth'),
            'id_company' => $company['id_company']
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
            'email'=> request('email'),
            'phone_number'=> request('phone_number'),
            'whatsapp_number'=> request('whatsapp_number'),
            'birth_day'=> request('birth_day'),
            'adress'=> request('adress'),
            'id_client'=> request('id_client'),
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
}
