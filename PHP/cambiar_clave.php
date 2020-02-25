<?php
/*
 * Parametros:$_POST['antigua'], $_POST['nueva1'], $_POST['nueva2'], $_SESSION['usuario']['Correo']
 *
 * Funcion:Llama a la funcion cambiar clave
 */
    require "../BD/bd.php";
    require "sesiones_json.php";

    if(!comprobar_sesion()) return;	

    if($_SERVER["REQUEST_METHOD"]==="POST"){
        echo cambiarClave($_POST['antigua'], $_POST['nueva1'], $_POST['nueva2'], $_SESSION['usuario']['Correo']);
    }