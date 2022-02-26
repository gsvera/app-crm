<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <script src="https://use.fontawesome.com/97a88bff0a.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
    <script type="text/javascript">
        window.CSRF_TOKEN = '{{ csrf_token() }}';
    </script>
    <title>Configuracion de empresa</title>
</head>
<body>
    <div id="menuPrincipal"></div>
    <div class="d-flex">
        <div id="menuConfigCompany" class="col-12 col-md-3 col-xl-2 bd-sidebar menu-left" style="padding:0;"></div>
        <div id="content" class="col-12 col-md-9 col-xl-10 py-md-3 pl-md-5 bd-content"></div>
    </div>
    <script src="{{ asset('../../js/app.js') }}"></script>
    <script src="{{ asset('js/alerts.js') }}"></script>
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/variables.js') }}"></script>
</body>
</html>