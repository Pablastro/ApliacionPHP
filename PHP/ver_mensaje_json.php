<?php
/*
 * Parametros:$_POST['codigo']
 *
 * Funcion:Llama a la funcion ver_recibidos
 */
    require_once '../BD/bd.php';

    $mensaje = ver_recibidos($_POST['codigo']);
    $ms_json = json_encode($mensaje, true);

    echo ($ms_json);