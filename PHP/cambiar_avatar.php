<?php
/*
 * Parametros:$_FILES['img_nueva']
 *
 * Funcion: Llama a la funcion de cambiar avatar
 */
    require "../BD/bd.php";
    require "sesiones_json.php";

    if(!comprobar_sesion()) return;	

    if($_SERVER["REQUEST_METHOD"]==="POST"){
        $tam=$_FILES["img_nueva"]["size"];
        $temp=$_FILES["img_nueva"]["tmp_name"];
        $ext=pathinfo($_FILES['img_nueva']['name'],PATHINFO_EXTENSION);
        $nombre=$_SESSION['usuario']['IdUsuario'].".".$ext;
        $_SESSION['usuario']['Avatar']=$nombre;
        echo cambiarAvatar($tam, $temp, $_FILES["img_nueva"]['name'], $_SESSION['usuario']['Correo']);
    }