<?php
/*
 * Parametros:$_POST['Usuario']
 *
 * Funcion:Llama a la funcion perfil
 */
require_once "../BD/bd.php";
require "sesiones_json.php";

if (!comprobar_sesion()) return;

$perfil_amigo = perfil($_POST['Usuario']);
$pfa_json = json_encode($perfil_amigo, true);

echo($pfa_json);