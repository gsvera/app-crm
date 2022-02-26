<?php

namespace App\Http\Controllers\Crm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ApiHelpers;
use App\Models\Respuesta;

class FolioController extends Controller
{
    public function getFolios()
    {
        $res = new Respuesta;
        $company = ApiHelpers::getCompany();

        try{
            $getFolios = ApiHelpers::httpRequest('get', 'foliosCompany/getFolios', ['id_company' => $company["id_company"]]);

            $res->error = $getFolios["error"];
            $res->message = $getFolios["message"];
            $res->data = $getFolios["data"];
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }
        
        return response()->json($res->getResult());
    }
    public function updateFolio()
    {
        $res = new Respuesta;

        $paramas = [
            'id_folio' => request('id_folio'),
            'count' => request('count'),
            'folio' => request('folio')
        ];

        try{
            $updateFolio = ApiHelpers::httpRequest('post', 'foliosCompany/updateFolio', $paramas);
            $res->error = $updateFolio["error"];
            $res->message = $updateFolio["message"];
        }
        catch(Exception $e)
        {
            $res->error = true;
            $res->message = $e->getMessage();
        }

        return response()->json($res->getResult());
    }
}
