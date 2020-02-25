<?php
/*
 * Parametros:EL correo del usuario
 *
 * Funcion: Llama a la funcion amigos para mostrar los amigos del usuario
 */
require_once "../BD/bd.php";
require "sesiones_json.php";

if (!comprobar_sesion()) return;

$amigos = amigos($_SESSION['usuario']['Correo']);
$amg_json = json_encode($amigos, true);

echo($amg_json);