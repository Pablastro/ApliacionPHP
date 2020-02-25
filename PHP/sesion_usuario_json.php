<?php
/*
 * Parametros:$_SESSION['usuario']
 *
 * Funcion: Llama a la funcion comprobar_sesion
 */
    require "sesiones_json.php";

    echo comprobar_sesion() ? json_encode($_SESSION['usuario']) : "FALSE";