<?php
/*
 * Parametros:$_SESSION['usuario']
 *
 * Funcion:Comprueba si la varible session existe
 */
function comprobar_sesion(){
	session_start();
	if(!isset($_SESSION['usuario'])){	
		return false;
	}else return true;		
}
