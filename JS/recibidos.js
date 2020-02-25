/*
*Parametros: codigo es el Codigo de un mensaje
*
*Esta funcion muestra el mensaje completo de uno de los mensajes de la Tabla de Recibidos, para crear este mensaje
*llama a la funcion crearMensaje() y le pasa como parámetro codigo
 */
function ver_mensaje(codigo){
	let params = new FormData();
	params.append('codigo', codigo);
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			//alert(this.responseText);
			let mensaje =  JSON.parse(this.responseText);
			let cabezera = document.getElementById("mensaje_titulo");
			let lugar = document.getElementById("mensaje");
			let completo = crearMensaje(mensaje);
			lugar.style.display = "block";
			cabezera.style.display = "block";
			cabezera.innerHTML = "Mensaje Completo";
			lugar.innerHTML = "";
			lugar.appendChild(completo);
		}
	};
	xhttp.open("POST", "../PHP/ver_mensaje_json.php", true);
	xhttp.send(params);				
	return false;
}

/*
*Esta funcion muestra la Tabla de Recibidos, para crear esta tabla llama a la funcion crearTablaRecibidos() y le pasa como
*parámetro lo que devuelve el archivo PHP
 */
function mostrarTabla(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {			
			let mensajes =  JSON.parse(this.responseText);
			let titulo = document.getElementById("titulo");
			let cont = document.getElementById("contenido");
			let msg = document.getElementById("mensaje");
			let titulo_secundario = document.getElementById("mensaje_titulo");
			titulo_secundario.innerHTML = "";
			let tabla = crearTablaRecibidos(mensajes);
			titulo.innerHTML = "Recibidos";
			cont.innerHTML = "";
			msg.innerHTML = "";
			titulo_secundario.style.display = "none";
            cont.appendChild(tabla);
		}
	};
	xhttp.open("GET", "../PHP/recibidos_json.php", true);
	xhttp.send();
	return false;
}

/*
*Parametros: msg_unico es un array con los valores de un mensaje
*
*Crea un div y dentro inserta cada elemento de msg_unico y devuelve este div
 */
function crearMensaje(msg_unico){
	let todo = document.createElement("div");
	let emisor = document.createElement("div");
	emisor.innerHTML = "De: " + msg_unico['Emisor'];
	let asunto = document.createElement("div");
	if (msg_unico['Asunto'] == ''){
		asunto.innerHTML = "Sin asunto";
	}else{
		asunto.innerHTML = "Asunto: " + msg_unico['Asunto'];
	}
	let mensaje = document.createElement("div");
 	mensaje.innerHTML = "Mensaje: " + msg_unico['Mensaje'];
	let fichero = document.createElement("div");
	if (msg_unico['Fichero'] != ""){
		let enlace = document.createElement("a");
		enlace.href = "../BD/Ficheros/Adjuntados/" + msg_unico['Fichero'];
		enlace.download = msg_unico['Fichero'];
		enlace.innerHTML = msg_unico['Fichero'];
		fichero.appendChild(enlace);
	}else{
		fichero.innerHTML = "No hay fichero adjuntos";
	}
	let responder = document.createElement("a");
	responder.href = "#";
	responder.innerHTML = "Responder";
	responder.onclick = function(){return responderMensajeFormu(msg_unico);}

	let cerrar_mensaje = document.createElement("a");
	cerrar_mensaje.href = "#";
	cerrar_mensaje.innerHTML = "Cerrar Mensaje";
	cerrar_mensaje.onclick = function(){return window.onload();}

	todo.appendChild(emisor);
	todo.appendChild(asunto);
	todo.appendChild(mensaje);
	todo.appendChild(fichero);
	todo.appendChild(responder);
	todo.appendChild(cerrar_mensaje);

	return todo;
}

/*
*Parametros: mensajes es un array con todos las filas de la tabla mensajes donde el receptor sea $_SESSION['usuario']
*
*Crea una tabla donde cada fila contendra el emisor, asunto, fichero_adjunto(si hay) y un cuadrado negro si esta leido
*(si no esta leido no muestra nada) y un elemento a para ver el Mensaje Completo
 */
function crearTablaRecibidos(mensajes){
	let tabla = document.createElement("table");
	if (mensajes.length == 0) {
		tabla.innerHTML = "No tienes mensajes";
	} else {
		let cabecera = 	crear_fila_cabezera(["De", "Asunto", "Fichero Adjunto"], "th");
		tabla.appendChild(cabecera);
		for (let  i = 0; i < mensajes.length; i++){
		let fila = crear_fila_cuerpo([mensajes[i]['Emisor'], mensajes[i]['Asunto'], mensajes[i]['Fichero'], mensajes[i]['Leido']], "td");
		let enlace = crearEnlace(mensajes[i]['Codigo']);
		let celda_enl = document.createElement("td");
		celda_enl.appendChild(enlace);
		fila.appendChild(celda_enl);		
		tabla.appendChild(fila);
		}	
	}
	return tabla;		
}

/*
*Parametros: campos es un array con lo que que va a contener cada elemento tipo
*			 tipo es un elemento que ira dentro del tr
*
*Creara un elemento tr y por cada elemento que haya en campos creara un elemento tipo y dentro de este insertara el valor
*de campos y este elemento lo unira al elemento tr
 */
function crear_fila_cabezera(campos, tipo){
	let fila = document.createElement("tr");
	for (let  i = 0; i < campos.length; i++){
		let celda = document.createElement(tipo);
		celda.innerHTML = campos[i];
		fila.appendChild(celda);
	}
	return fila;
}

/*
*Parametros: campos es un array con lo que que va a contener cada elemento tipo
*			 tipo es un elemento que ira dentro del tr
*
*Creara un elemento tr y por cada elemento que haya en campos creara un elemento tipo y dentro de este insertara el valor
*de campos y si Leido es igual a 1 insertara un elemento tipo con color de fondo negro sino no no tendra color de fondo
* negro y este elemento lo unira al elemento tr
 */
function crear_fila_cuerpo(campos, tipo){
	let fila = document.createElement("tr");
	for (let  i = 0; i < campos.length; i++){
		let celda = document.createElement(tipo);
		if(i == campos.length - 1){
			if(campos[i] == 0){
				celda.style.backgroundColor = "black";
				celda.style.width = "15px";
			}
		}else{
			celda.innerHTML = campos[i];
		}
		fila.appendChild(celda);
	}
	return fila;
}

/*
*Parametros: codigo es el codigo del mensaje
*
*Crea un elemento a al que metera el texto "Ver Mensaje" y cuando se de 1 click a este elemento se ejecutara la funcion
*ver_mensaje() pasandole como parámetro cod
 */
function crearEnlace(cod){
	var enlace = document.createElement("a");
	enlace.href = "#";
	enlace.innerHTML = "Ver Mensaje";
	enlace.onclick = function(){return ver_mensaje(cod);};
	return enlace;
}