<?php
/*
 * Parametros:El correo del usuario
 *
 * Funcion: Llama a la funcion verSolicitudes para mostrar las solicitudes del usuario.
 */
require_once "../BD/bd.php";
require "sesiones_json.php";

if (!comprobar_sesion()) return;

$amistad = verSolicitudes($_SESSION['usuario']['Correo']);
$amt_json = json_encode($amistad, true);

echo($amt_json);