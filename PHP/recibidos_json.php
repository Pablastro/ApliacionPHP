<?php
/*
 * Parametros:$_SESSION['usuario']['Correo']
 *
 * Funcion:Llama la funcion recibidos
 */
    require_once "../BD/bd.php";
    require "sesiones_json.php";

    if(!comprobar_sesion()) return;	

    $recibidos=recibidos($_SESSION['usuario']['Correo']);
    $reci=array_reverse($recibidos);
    $rb_json = json_encode($reci, true);

    echo ($rb_json);
