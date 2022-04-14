<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <script src="https://use.fontawesome.com/97a88bff0a.js"></script>
    <script type="text/javascript">
        window.CSRF_TOKEN = '{{ csrf_token() }}';
    </script>
    <title>Modulos</title>
</head>
<body class="">
    <div id="menuPrincipal"></div>
    <div class="d-flex">
        <div id="menuCrm" class="col-12 col-md-3 col-xl-2 menu-left" style="padding:0;"></div>
        <div id="content" class="col-12 col-md-9 col-xl-10 bd-content"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="{{ asset('js/alerts.js') }}"></script>
    <script src="{{ asset('js/helpers.js') }}"></script>
    <script src="{{ asset('js/variables.js') }}"></script>
    <script src="{{ asset('../../js/app.js') }}"></script>
</body>
</html>