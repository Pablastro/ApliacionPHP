<?php
/*
 * Parametros:
 *
 * Funcion:Llama a la funcion usuarios
 */
    require_once '../BD/bd.php';
    
    $usuarios = usuarios();
    $usu_json = json_encode($usuarios);

    echo($usu_json);