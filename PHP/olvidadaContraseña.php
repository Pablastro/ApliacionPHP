<?php
/*
 * Parametros:$_POST['correo']
 *
 * Funcion:Llama a la funcion ClaveOlvidada
 */
    require_once "../BD/bd.php";
    
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $usu = ClaveOlvidada($_POST['correo']);
        if($usu===FALSE){
            echo "FALSE";
        }else{
            return TRUE;
        }	
    }
?>