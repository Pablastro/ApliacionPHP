<?php
/*
 * Parametros: El correo del usuario y el IdUsuario al que queremos añadir
 *
 * Funcion: Archivo que llama a la funcion aceptar_solicitud
 */
require_once "../BD/bd.php";
require "sesiones_json.php";

if (!comprobar_sesion()) return;

echo aceptar_solicitud($_SESSION['usuario']['Correo'], $_POST['usuario']);
