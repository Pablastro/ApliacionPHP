<?php
/*
 * Parametros:$_SESSION['usuario']['Correo'], $_POST['usuario']
 *
 * Funcion:Llama a la funcion denegar_solicitud
 */
require_once "../BD/bd.php";
require "sesiones_json.php";

if (!comprobar_sesion()) return;

echo denegar_solicitud($_SESSION['usuario']['Correo'], $_POST['usuario']);
