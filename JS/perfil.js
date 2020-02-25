/*
*Cojera los datos de la varible $_SESSION['usuario'] y se los pasa a la función MostrarMenus() que se encarga de crear
*elementos para mostrar estos datos
 */
function cargarPerfil(){
    let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
            //console.log(this.responseText);
			if(this.responseText !== "FALSE"){
                let datos_usuario = JSON.parse(this.responseText);
                mostrarMenus(datos_usuario);
			}else{
				document.getElementById("login").style.display = "block";
			}			
		}};	
		xhttp.open("GET", "../PHP/sesion_usuario_json.php", true);
		xhttp.send();		
	return false;
}

/*
*Recoje los datos del formulario creado con CambiarClaveFormu() se los pasa al archivo PHP y segun lo que nos devuelva se
*mostrara un alert
 */
function cambiarClave(){
    let xhttp = new XMLHttpRequest();
    let formu = document.forms.namedItem("miform");
    let params = new FormData(formu);
	xhttp.onreadystatechange = function() {
        //console.log(this.responseText);
		if (this.readyState === 4 && this.status === 200) {
            if (this.responseText === "TRUE") {
                alert("Se ha cambiado la contraseña correctamente");
                document.getElementById("mensaje_titulo").innerHTML = "";
                document.getElementById("mensaje").innerHTML = "";
            }else if (this.responseText){
                alert("La contraseña nueva no puede ser igual a la actual");
            }else if(this.responseText === "error_antigua"){
                alert("La contraseña actual no es correcta");
			}else if(this.responseText === "error_nueva1"){
                alert("La contraseña debe contener 1 mayúscula, 1 minúscula," + 
                "1 número y 1 carácter no alfanumérico como mínimo");
            }else if(this.responseText === "error_coincidencia"){
                alert("Las contraseña nueva y la repetición de esta no coinciden");
            }
            window.location.reload();
        }
    };
	xhttp.open("POST", "../PHP/cambiar_clave.php", true);
	xhttp.send(params);		
	return false;
}

/*
*Recoje los datos del formulario creado con CambiarAvatarFormu() se los pasa al archivo PHP y segun lo que nos devuelva se
*mostrara un alert
 */
function cambiarAvatar() {
    let xhttp = new XMLHttpRequest();
    let formu = document.forms.namedItem("miform");
    let params = new FormData(formu);
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
		    //console.log(this.responseText);
			if(this.responseText === "TRUE"){
                alert("Se ha cambiado el avatar correctamente");
				document.getElementById("mensaje_titulo").innerHTML = "";
				document.getElementById("mensaje").innerHTML = "";
			}else if (this.responseText === "error_tam"){
                alert("No se ha cambiado la imagen debido a que la nueva imagen es demasiado grande");
            }
            window.location.reload();
        }
    };
	xhttp.open("POST", "../PHP/cambiar_avatar.php", true);
	xhttp.send(params);		
	return false;
}

/*
*Parametros: datos, contenido de la varible $_SESSION['usuario']
*
*Crea dos divs uno a la izquierda que contiene los datos del usuario y otro a la derecha con opciones
 */
function mostrarMenus(datos) {
    let contenido = document.getElementById("contenido");
    let titulo = document.getElementById("titulo");
    let titulo_secundario = document.getElementById("mensaje_titulo");
    let mensaje = document.getElementById("mensaje");

    contenido.innerHTML = "";
    titulo.innerHTML = "Perfil";
    let opciones = document.createElement("div");
    let perfil = document.createElement("div");

    let avatar = document.createElement("img");
    avatar.src = "../BD/Ficheros/Avatares/" + datos['Avatar'];
    avatar.id = "imagen";
    let nombre_apellidos = document.createElement("p");
    nombre_apellidos.innerHTML = "Nombre y Apellidos: " + datos['Nombre'] + " " + datos['Apellidos'];
    let f_nac = document.createElement("p");
    f_nac.innerHTML = "Fecha nacimiento: " + datos['FechaNacimiento'];
    let telefono = document.createElement("p");
    telefono.innerHTML = "Telefono: " + datos['Telefono'];
    let direccion = document.createElement("p");
    direccion.innerHTML = "Direccion: " + datos['Direccion'];

    perfil.appendChild(avatar);
    perfil.appendChild(nombre_apellidos);
    perfil.appendChild(f_nac);
    perfil.appendChild(telefono);
    perfil.appendChild(direccion);

    let enlace_caja = document.createElement("p");
    let contraseña_nueva = document.createElement("a");
    contraseña_nueva.href = "#";
    contraseña_nueva.innerHTML = "Cambiar Contraseña";
    contraseña_nueva.onclick = function(){return cambiarClaveFormu();}
    let avatar_caja = document.createElement("p");
    let avatar_nuevo = document.createElement("a");
    avatar_nuevo.href = "#";
    avatar_nuevo.innerHTML = "Cambiar Avatar";
    avatar_nuevo.onclick = function(){return cambiarAvatarFormu();}
    
    enlace_caja.appendChild(contraseña_nueva);
    avatar_caja.appendChild(avatar_nuevo);

    opciones.appendChild(enlace_caja);
    opciones.appendChild(avatar_caja);

    titulo_secundario.style.display = "none";
    mensaje.style.display = "none";
    perfil.style.cssFloat = "left";
    opciones.style.cssFloat = "right";

    contenido.appendChild(opciones);
    contenido.appendChild(perfil);
}