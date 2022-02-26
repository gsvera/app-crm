<?php 
    if(request()->session()->get('company')){
        $dataCompany = request()->session()->get('company'); 
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <script src="https://use.fontawesome.com/97a88bff0a.js"></script>
    <title>Modulos</title>
</head>
<body class="back-modules">
    
    
    <div id="menuPrincipal"></div>
    @if(request()->session()->get('company'))
        <h1 class="text-center my-2">{{$dataCompany['name_company']}}</h1>
    @endif
    <div id="modules">
        <div class="m-3 row justify-content-center">
            <div class="card col-4 back-card m-2">
                <div class="card-body">
                    <img src="/img/crm.png" class="img-modulo mx-auto"/>
                    <h4 class="card-title font-weight-bold">CRM</h4>
                    <p class="card-text">Customer Relationship Management</p>
                    <a href="/crm" class="btn btn-primary btn-block">Abrir</a>
                </div>
            </div>
            <div class="card col-4 back-card m-2">
                <div class="card-body">
                    <img src="/img/config-company.png" class="img-modulo mx-auto"/>
                    <h4 class="card-title font-weight-bold">Configuración Empresa</h4>
                    <p class="card-text">Configuración de datos de la empresa</p>
                    <a href="/configuracion-company" class="btn btn-primary btn-block">Abrir</a>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('../../js/app.js') }}"></script>
</body>
</html>