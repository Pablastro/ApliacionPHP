<?php
/*
 * Parametros:$_POST['correo'], $_POST['clave']
 *
 * Funcion:Llama a la funcion comprobar_usuario
 */

require_once '../BD/bd.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {  
	$usu = comprobar_usuario($_POST['correo'], $_POST['clave']);
	if($usu===FALSE){
		echo "FALSE";
	}else{
		session_start();
		// $usu tiene todos los campos de ese Usuario
		$_SESSION['usuario'] = $usu;
		echo $_SESSION['usuario']['Avatar'];
	}	
}

