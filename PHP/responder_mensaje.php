<?php
/*
 * Parametros:$_SESSION['usuario']['Correo'],$_POST['destino'],$_POST['asunto'],$_POST['mensaje'],$name
 *
 * Funcion: Llama a la funcion responder_mensaje
 */
    require "../BD/bd.php";
    require "sesiones_json.php";

    if(!comprobar_sesion()) return;	

    if($_SERVER["REQUEST_METHOD"]==="POST"){
    $temp=$_FILES['fichero']["tmp_name"];
    $name=$_FILES['fichero']['name'];

    $avatar = ficheros($temp,$name);
    if($avatar===NULL){
        $_POST['fichero']="NULL";
    }

    echo responder_mensaje($_SESSION['usuario']['Correo'],$_POST['destino'],$_POST['asunto'],$_POST['mensaje'],$name);
}
