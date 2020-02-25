<?php
/*
 * Parametros:$_SESSION['usuario']['Correo']
 *
 * Funcion:Llama a la funcion usuariosSolicitud
 */
    require "../BD/bd.php";
    require "sesiones_json.php";

    if(!comprobar_sesion()) return;

    $usuarios=usuariosSolicitud($_SESSION['usuario']['Correo']);
    $usu_json = json_encode($usuarios, true);

    echo ($usu_json);
