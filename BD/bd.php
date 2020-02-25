<?php
use PHPMailer\PHPMailer\PHPMailer;
require "../vendor/autoload.php";

/*
*Parametros: El $nombre es el fichero de configuracion .xml y el $esquema es el fichero de configuracion .xsd

Funcion: Sirve para poder conectarse a la base de datos
*/
function leer_config($nombre, $esquema){
	$config = new DOMDocument();
	$config->load($nombre);
	$res = $config->schemaValidate($esquema);
	if ($res===FALSE){ 
	   throw new InvalidArgumentException("Revise fichero de configuración");
	} 		
	$datos = simplexml_load_file($nombre);	
	$ip = $datos->xpath("//ip");
	$nombre = $datos->xpath("//nombre");
	$usu = $datos->xpath("//usuario");
	$clave = $datos->xpath("//clave");	
	$cad = sprintf("mysql:dbname=%s;host=%s", $nombre[0], $ip[0]);
	$resul = [];
	$resul[] = $cad;
	$resul[] = $usu[0];
	$resul[] = $clave[0];
	return $resul;
}

/*
*Parametros: $correo y $clave que son los datos para poder iniciar sesion
*
*Funcion: Sirve para comprobar que el usuario que esta intentando iniciar sesion existe en la base de datos
*
*/
function comprobar_usuario($correo, $clave){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	
	$resul = $bd->prepare('SELECT * FROM usuarios WHERE correo = :email');
	$resul->bindParam(':email', $correo);

	$resul->execute();

	$row = $resul->fetch(PDO::FETCH_ASSOC);

	return password_verify($clave, $row['Clave']) ? $row : FALSE;
}

/*
*Parametros: $correo al que se le enviara la nueva contraseña
*
*Funcion: Sirve para manda un mail al $correo especificado con la contraseña nueva que se autogenera.
*Una vez enviado el correo se actualiza en la base de datos.
*
*/
function ClaveOlvidada($correo) { 
	$res = leer_config("../BD/configuracion.xml", "../BD/configuracion.xsd");
	$clave = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 5);
	$hash = password_hash($clave, PASSWORD_DEFAULT);
	$bd = new PDO($res[0], $res[1], $res[2]);
	
	$consulta = "UPDATE usuarios set Clave = '$hash' WHERE Correo = '$correo'";

	$resul = $bd->query($consulta);

	return ($resul->rowCount() > 0) ? enviar_correo($correo, $clave) : FALSE;
}

/*
*Parametros: En los parametros pasamos todos los datos del formulario de crear nuevo usuario
*
*Funcion: Si la contraseña es correcta (comprobado con la funcion clave()) se inserta en la base de datos.
*/
function add_usuario($correo, $usuario, $nombre,$apellido,$nacimiento,$telefono,$direccion,$avatar,$clave){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	$sw = FALSE;
	
	$clave2=password_hash($clave,PASSWORD_DEFAULT);
	$sql = "INSERT INTO usuarios (Correo, IdUsuario, Nombre, Apellidos, FechaNacimiento, Telefono, Direccion, Avatar, Clave)
		VALUES ('$correo', '$usuario', '$nombre', '$apellido', '$nacimiento', '$telefono', '$direccion','$avatar','$clave2')";

	$resul=$bd->query($sql);
		
	return clave($clave) ? $resul : FALSE;	
}

/*
*Parametros: Le pasamos como parametro el tamaño, nombre temporal, el nombre que queremos ponerle y la extension que tiene el fichero
*
*Funcion: Si tiene el tamaño correcto, se guarda el avatar con el nombre de usuario y la extension en la carpeta especificada.
*/
function avatar($tam,$temp,$nombre,$ext){
	$sw = FALSE;

	if($tam > 500 * 2048){
		return FALSE;
	}else{
		$res = move_uploaded_file($temp,"../BD/Ficheros/Avatares/" . $nombre.".".$ext);
		if($res){
			$sw = TRUE;
		} 
	}

	return $sw;
}

/*
*Parametros: Le pasamos como parametro la clave que queremos comprobar
*
*Funcion: Comprueba que la clave pasada como parametro tiene al menos, 1 mayuscula, 1 minuscula, un caracter alfanumerico, 1 numero y sea entre 6 y 15 caracteres
*/
function clave($clave){
    $cadena1="/[A-Z]/";
    $cadena2="/[a-z]/";
    $cadena3="/[0-9]/";
	$sw=FALSE;
    if((strlen($clave)>=6 and strlen($clave)<=15) and (preg_match($cadena1,$clave)==TRUE) and (preg_match($cadena2,$clave)==TRUE) and (preg_match($cadena3,$clave)==TRUE) and (ctype_alnum($clave)==FALSE)){
        $sw=TRUE;
    }
    return $sw;
}

/*
*Parametros: Le pasamos como parametros los datos introducidos en el html con la informacion del mensaje
*
*Funcion: Lo primero que hace es sacar el correo del usuario al que queremos enviarle el correo ya que seleccionamos su ID en la pagina
* Una vez sacado el correo insertamos los datos en la base de datos.
*/
function enviar_mensaje($emisor,$usuario,$asunto,$mensaje,$fichero){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	$leido = 0;

	
	$sql2="SELECT correo FROM usuarios WHERE IdUsuario='$usuario'";
	$resul2=$bd->query($sql2);

	$receptor=$resul2->fetch(PDO::FETCH_ASSOC);

	$receptor2=$receptor['correo'];

	$sql="INSERT INTO mensajes (Emisor,Receptor,Asunto,Mensaje,Fichero,Leido) 
	VALUES('$emisor','$receptor2','$asunto','$mensaje','$fichero',$leido)";
	$resul=$bd->query($sql);

	return $resul ? "TRUE" : "FALSE";
}

/*
*Parametros: La informacion que tendra dicho mensaje
*
*Funcion: A diferencia de la funcion anterior, como es para responder ya tenemos el remitente y el receptor por lo que solo insertamos.
*/
function responder_mensaje($emisor,$destinatario,$asunto,$mensaje,$fichero){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	$leido = 0;

	$sql="INSERT INTO mensajes (Emisor,Receptor,Asunto,Mensaje,Fichero,Leido) 
	VALUES('$emisor','$destinatario','$asunto','$mensaje','$fichero',$leido)";
	$resul=$bd->query($sql);

	return $resul ? "TRUE" : "FALSE";
}

/*
*Parametros: El nombre temporal de archivo y el nombre del archivo
*
*Funcion: Guarda el fichero en la carpeta especificada
*/
function ficheros($temp,$nombre){
	$res = move_uploaded_file($temp,"../BD/Ficheros/Adjuntados/" . $nombre);
	return $res ? TRUE : FALSE;
}

/*
*Parametros: El correo del usuario conectado a la aplicacion
*
*Funcion: Saca todos los correos que esten almacenados en la base de datos dirigidos al usuario que usa la aplicacion
*/
function recibidos($correo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="SELECT * from mensajes where receptor='$correo'";

	$resul=$bd->query($sql);

	return $resul->fetchALL(PDO::FETCH_ASSOC);
}

/*
*Parametros: No tiene
*
*Funcion: Saca los ID de los usuarios de la base de datos
*/
function usuarios(){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="SELECT IdUsuario FROM usuarios";

	$resul=$bd->query($sql);
	$usu = $resul->fetchALL(PDO::FETCH_ASSOC);

	return $usu;
}

/*
*Parametros: Le pasamos como parametro el codigo de un mensaje
*
*Funcion: Saca toda la informacion de un mensaje en concreto
*/
function ver_recibidos($cod){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="SELECT * FROM mensajes WHERE Codigo=$cod";

	$resul=$bd->query($sql);

	if($resul->rowCount()==1){
		leido($cod);
		return $resul->fetch(PDO::FETCH_ASSOC);
	}
}

/*
*Parametros: Le pasamos como parametro el codigo de un mensaje
*
*Funcion: Cambia el valor de leido en la base de datos a 1, significando que el usuario lo ha leido
*/
function leido($cod){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="UPDATE mensajes SET Leido = 1 WHERE Codigo = '$cod'";

	$resul=$bd->query($sql);
}

/*
*Parametros: Le pasamos como parametro el tamaño, nombre temporal y nombre del avatar y el correo del usuario que cambia el avatar.
*
*Funcion: Primero borra el avatar anterior de la carpeta y despues lo cambia en la base de datos y lo guarda en la carpeta destinada
*/
function cambiarAvatar($tam,$tmp,$nombre,$correo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	//La variable correo es enrealidad $_SESSION['usuario]['Correo']

	if($tam<500*2048){
		$avatar=mostrar_avatar($correo);
		if($avatar!="default.jpg"){
			borrarAvatar($correo);
		}

		$sql="SELECT IdUsuario from usuarios where Correo='$correo'";
		$resul=$bd->query($sql);

		$row=$resul->fetch(PDO::FETCH_ASSOC);

		$ext = pathinfo($nombre, PATHINFO_EXTENSION);
		$name=$row['IdUsuario'];
		avatar($tam,$tmp,$name,$ext);
		$name2=$name.".".$ext;

		$sql2="UPDATE usuarios set avatar='$name2' where correo='$correo'";
		$resul2=$bd->query($sql2);

		if($resul2){
			return "TRUE";
		}
	}else{
		return "error_tam";
	}
}

/*
*Parametros:Le pasamos como parametro la contraseña antigua, la nueva, la nueva repetida y el correo del usuario
*
*Funcion: Primero comprueba que la contraseña nueva es distinta a la antigua, luego comprueba que introduces bien dos veces la nueva y luego la
*cambia en la base de datos.
*/
function cambiarClave($antigua, $nueva, $repetida,$correo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="SELECT Clave FROM usuarios WHERE Correo = '$correo'";
	$resul=$bd->query($sql);
	$row = $resul->fetch(PDO::FETCH_ASSOC);

	if(password_verify($antigua, $row['Clave'])){
		if(password_verify($nueva, $row['Clave']) == FALSE){
			if(clave($nueva)){
				if($repetida === $nueva){
					$clave2=password_hash($nueva ,PASSWORD_DEFAULT);
					$sql="UPDATE usuarios  set Clave='$clave2' where Correo='$correo'";
					$resul=$bd->query($sql);
					if ($resul){
						return "TRUE";
					}
				}else{
					return "error_coincidencia";
				}
			}else{
				return "error_nueva1";
			}
		}else{
			return "error_igual";
		}
	}else{
		return "error_antigua";
	}
}

/*
*Parametros: El correo del destinatario y la nueva contraseña
*
*Funcion: Envia un correo al que ha solicitado una nueva contraseña
*/
function enviar_correo($correo, $clave){
	$texto = "<h1>Correo: $correo </h1><h2>Nueva contraseña: $clave </h2>";

	$mail = new PHPMailer();		
	$mail->IsSMTP(); 					
	$mail->SMTPDebug  = 0;  // cambiar a 1 o 2 para ver errores
	$mail->SMTPAuth   = true;                  
	$mail->SMTPSecure = "tls";                 
	$mail->Host       = "smtp.gmail.com";      
	$mail->Port       = 587;                   
	$mail->Username   = "aplicacion1920@gmail.com";  //usuario de gmail
	$mail->Password   = "Aplicacion-Mensajes-19-20"; //contraseña de gmail
	$mail->SetFrom('noreply@empresafalsa.com', 'Reseteo de Contraseña');
	$mail->Subject    = "Reseteo de contraseña";
	$mail->MsgHTML($texto);
	$mail->AddAddress($correo);
	$mail->CharSet = 'UTF-8';
	if(!$mail->Send()) {
	  return FALSE;
	} else {
	  return TRUE;
	}
}


function mostrar_avatar($correo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	$sql="SELECT Avatar FROM usuarios WHERE Correo='$correo'";
	$resul=$bd->query($sql);

	$row = $resul->fetch(PDO::FETCH_ASSOC);

	return $row['Avatar'];
}

/*
*Parametros: El correo del usuario utilizando la aplicacion
*
*Funcion: Saca el nombre del avatar del usuario y lo borra de la carpeta donde esta guardado
*/
function borrarAvatar($correo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="SELECT Avatar from usuarios where correo='$correo'";
	$resul=$bd->query($sql);

	$aux=$resul->fetch(PDO::FETCH_ASSOC);
	$avatar=$aux['Avatar'];

	unlink("../BD/Ficheros/Avatares/".$avatar);
}

/*
*Parametros: El correo del usuario
*
*Funcion: Busca en la base de datos la solicitudes de amistad que el usuario tiene disponibles
*/
function verSolicitudes($correo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="SELECT IdUsuario from usuarios u,solicitudes s where u.correo=s.amigo and usuario='$correo'
 	and not solicitante='$correo'";

	$resul=$bd->query($sql);
	$row=$resul->fetchAll(PDO::FETCH_ASSOC);
	return $row;
}
/*
 * Parametros: Recibe el correo que la variables $_SESSION['usuario']['correo'] y $amigo viene del post en la pagina
 *
 * Funcion: La funcion crea dos entradas en la tabla de solicitudes. La varible $amigo es el id de usuario de un usuario
 * y dentro de la funcion se saca el correo con un consulta y se inserta en la tabla.
 */
function solicitudAmistad($correo,$amigo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql3="SELECT correo FROM usuarios WHERE IdUsuario='$amigo'";
	$resul3=$bd->query($sql3);

	$receptor=$resul3->fetch(PDO::FETCH_ASSOC);
	$receptor2=$receptor['correo'];

	$sql="INSERT into solicitudes(Usuario,Amigo,Solicitante) values('$correo','$receptor2','$correo')";
	$sql2="INSERT into solicitudes(Usuario,Amigo,Solicitante) values('$receptor2','$correo','$correo')";
	$resul=$bd->query($sql);
	$resul2=$bd->query($sql2);

	return ($resul and $resul2) ? "TRUE" : "FALSE";
}

/*
*Parametros: El correo del usuario y el Id del usuario al que quiere añadir
*
*Funcion: Despues de sacar el correo del usuario al que quiere añadir, borra de la tabla de solicitudes la solicitud y luego inserta en la tabla amigos
* la amistad
*/
function aceptar_solicitud($correo,$amigo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql3="SELECT correo FROM usuarios WHERE IdUsuario='$amigo'";
	$resul3=$bd->query($sql3);

	$receptor=$resul3->fetch(PDO::FETCH_ASSOC);
	$receptor2=$receptor['correo'];

	denegar_solicitud($correo,$amigo);
	$sql="INSERT into amigos values('$correo','$receptor2')";
	$sql2="INSERT into amigos values('$receptor2','$correo')";
	$resul=$bd->query($sql);
	$resul2=$bd->query($sql2);

	return ($resul and $resul2) ? "TRUE" : "FALSE";
}

/*
*Parametros: El correo del usuario y el Id del usuario al que quiere añadir
*
*Funcion: Borra de la tabla solicitudes la solicitud ya bien porque la haya denegado o porque la haya aceptado
*/
function denegar_solicitud($correo,$amigo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql3="SELECT correo FROM usuarios WHERE IdUsuario='$amigo'";
	$resul3=$bd->query($sql3);

	$receptor=$resul3->fetch(PDO::FETCH_ASSOC);
	$receptor2=$receptor['correo'];

	$sql="DELETE FROM solicitudes where Usuario='$correo' and Amigo='$receptor2'";
	$sql2="DELETE FROM solicitudes where Usuario='$receptor2' and Amigo='$correo'";
	$resul=$bd->query($sql);
	$resul2=$bd->query($sql2);

	return ($resul and $resul2) ? "TRUE" : "FALSE";
}

/*
*Parametros: El correo del usuario
*
*Funcion: Busca en la base de datos aquellos usuarios a los que todavia no tiene añadidos
*/
function usuariosSolicitud($correo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="SELECT IdUsuario from usuarios where Correo not in(SELECT Amigo from amigos where Usuario='$correo') and not Correo='$correo'";

	$resul=$bd->query($sql);
	$row = $resul->fetchALL(PDO::FETCH_ASSOC);

	return $row;
}

/*
*Parametros: El correo del usuario
*
*Funcion: Busca en la base de datos el Id de usuario de aquellos usuarios que sean su amigo
*/
function amigos($correo){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql="SELECT IdUsuario from usuarios u,amigos a where u.correo=a.amigo and usuario='$correo'";

	$resul=$bd->query($sql);
	$row=$resul->fetchAll(PDO::FETCH_ASSOC);
	return $row;
}

/*
*Parametros: El correo del usuario
*
*Funcion: Saca la informacion del usuario al que tiene añadido
*/
function perfil($usuario){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);

	$sql3="SELECT correo FROM usuarios WHERE IdUsuario='$usuario'";
	$resul=$bd->query($sql3);

	$receptor=$resul->fetch(PDO::FETCH_ASSOC);
	$receptor2=$receptor['correo'];

	$sql="SELECT * FROM usuarios u, amigos a WHERE u.correo=a.amigo and a.amigo='$receptor2'";

	$resul=$bd->query($sql);

	return $resul->fetch(PDO::FETCH_ASSOC);
}
?>
