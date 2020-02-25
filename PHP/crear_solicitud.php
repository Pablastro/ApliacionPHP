<?php
/*
 * Parametros:$_SESSION['usuario']['Correo'],$_POST['usuarios']
 *
 * Funcion: Llama a al funcion solicitudAmistad para crear una solicitud
 */
    require "../BD/bd.php";
    require "sesiones_json.php";

    if(!comprobar_sesion()) return;

    if($_SERVER["REQUEST_METHOD"]==="POST") {
        echo solicitudAmistad($_SESSION['usuario']['Correo'],$_POST['usuarios']);
    }