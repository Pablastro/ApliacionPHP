<?php
/*
 * Parametros:$_FILES['file']
 *
 * Funcion:Llama a la funcion add_usuario y avatar.
 */
    require "../BD/bd.php";

    if ($_SERVER["REQUEST_METHOD"] === "POST") { 
        $tam=$_FILES["file"]["size"];
        $temp=$_FILES["file"]["tmp_name"];
        $nombre=$_POST['usuario'];

        
        $ext = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
        $avatar = avatar($tam,$temp,$nombre,$ext);
    
        if($avatar===FALSE){
            $_POST["file"]="default.jpg";         
        }else{
            $_POST["file"]=$_POST['usuario'].".".$ext;
        }

        $usu = add_usuario($_POST['correo'], $_POST['usuario'], $_POST['nombre'],$_POST['apellidos'],
        $_POST['f_nacimiento'], $_POST['telefono'], $_POST['direccion'], $_POST['file'],$_POST['clave']);

        if($usu === FALSE){
            echo "FALSE";
        }else{
            return TRUE;
        }
    }
?>