/*
*Parametros: funcion, una funcion que se asociara a la funcion onclick del boton submit
*
*Crea un formulario para solicitar una nueva contraseña con sus respectivos labels, este form tiene un input correo y
*un boton submit que llama a la funcion JavaScript
 */
function olvidadaFormu(funcion){
	var home = document.getElementById("home");
	var pass = document.getElementById("contraseña");
	home.style.display = "none";
	pass.style.display = "block";
	var formulu = document.createElement("form");
	formulu.name = "miform";
	formulu.method = "POST";
	formulu.enctype = "multipart/form-data";
	formulu.innerHTML = "Correo ";
	var correo = document.createElement("input");
	correo.type = "email";
	correo.id = "correo";
	correo.name = "correo";
	var bsubmit = document.createElement("input");
	bsubmit.type = "submit";
	bsubmit.onclick = function(){return funcion();}

	formulu.appendChild(correo);
	formulu.appendChild(bsubmit);
	
	pass.innerHTML = "";	
	pass.appendChild(formulu);
}

/*
*Crea un formulario para registrar a un nuevo usuario con sus respectivos labels, donde cada input es paracada columna
*de la tabla usuarios y un boton submit que llama a la funcion JavaScript
 */
function nuevoUsuFormulario() {
	var home = document.getElementById("home");
	var usunuevo = document.getElementById("nuevousu");
	home.style.display = "none";
	usunuevo.style.display = "block";
	var formulu = document.createElement("form");
	formulu.name = "miform";
	formulu.method = "POST";
	formulu.enctype = "multipart/form-data";
	var correo = document.createElement("input");
	var correol = document.createElement("label");
	correol.htmlFor = "correo";
	correol.innerHTML = "Correo ";
	correo.type = "email";
	correo.name = "correo";
	correo.required = true;
	var usu = document.createElement("input");
	var usul = document.createElement("label");
	usul.htmlFor = "usuario";
	usul.innerHTML = "Usuario ";
	usu.type = "text";
	usu.name = "usuario";
	usu.required = true;
	var nombre = document.createElement("input");
	var nombrel = document.createElement("label");
	nombrel.htmlFor = "nombre";
	nombrel.innerHTML = "Nombre ";
	nombre.type = "text";
	nombre.name = "nombre";
	nombre.required = true;
	var apellidos = document.createElement("input");
	var apellidol = document.createElement("label");
	apellidol.htmlFor = "apellidos";
	apellidol.innerHTML = "Apellidos ";
	apellidos.type = "text";
	apellidos.name = "apellidos";
	apellidos.required = true;
	var f_nacimiento = document.createElement("input");
	var f_nacimientol = document.createElement("label");
	f_nacimientol.htmlFor = "f_nacimiento";
	f_nacimientol.innerHTML = "Fecha Nacimiento";
	f_nacimiento.type = "date";
	f_nacimiento.name = "f_nacimiento";
	f_nacimiento.required = true;
	var telefono = document.createElement("input");
	var telefonol = document.createElement("label");
	telefonol.htmlFor = "telefono";
	telefonol.innerHTML = "Telefono";
	telefono.type = "tel";
	telefono.name = "telefono";
	telefono.max = 9;
	telefono.required = true;
	var direccion = document.createElement("input");
	var direccionl = document.createElement("label");
	direccionl.htmlFor = "direccion";
	direccionl.innerHTML = "Direccion";
	direccion.type = "text";
	direccion.name = "direccion";
	direccion.required = true;
	var fichero = document.createElement("input");
	var ficherol = document.createElement("label");
	ficherol.htmlFor = "file";
	ficherol.innerHTML = "Fichero ";
	fichero.type = "file";
	fichero.name = "file";
	fichero.accept = "image/*";
	var pass = document.createElement("input");
	var passl = document.createElement("label");
	passl.htmlFor = "clave";
	passl.innerHTML = "Contraseña ";
	pass.type = "password";
	pass.name = "clave";
	pass.required = true;
	var bsubmit = document.createElement("input");
	bsubmit.type = "submit";
	bsubmit.value = "Registrarse";
	bsubmit.onclick = function(){return nuevoUsuario();}

	formulu.appendChild(correol);
	formulu.appendChild(correo);
	formulu.appendChild(usul);
	formulu.appendChild(usu);
	formulu.appendChild(nombrel);
	formulu.appendChild(nombre);
	formulu.appendChild(apellidol);
	formulu.appendChild(apellidos);
	formulu.appendChild(f_nacimientol);
	formulu.appendChild(f_nacimiento);
	formulu.appendChild(telefonol);
	formulu.appendChild(telefono);
	formulu.appendChild(direccionl);
	formulu.appendChild(direccion);
	formulu.appendChild(ficherol);
	formulu.appendChild(fichero);
	formulu.appendChild(passl);
	formulu.appendChild(pass);
	formulu.appendChild(bsubmit);
	
	usunuevo.innerHTML = "";
	usunuevo.appendChild(formulu);
	alert("La contraseña debe contener 1 mayúscula, 1 minúscula," + 
    "1 número y 1 carácter no alfanumérico como mínimo");
}

/*
*Parametros: usu, un array que contiene los IdUsuario de todos los usuarios existentes
*
*Crea un formulario para enviar un mensaje a un usuario, este formulario con sus respectivos labels se compone de un
*select(cada option es un IdUsuario) el asunto, el mensaje, la opción de añadir 1 fichero y un boton submit que llama
*a la funcion JavaScript
 */
function enviarMensaje(usu) {
	let formu = document.createElement("form");
	formu.id = "miform";
	formu.name = "miform";
	formu.method = "POST";
	formu.enctype = "multipart/form-data";
	let selectl = document.createElement("label");
	selectl.htmlFor = "usuarios";
	selectl.innerHTML = "Para: ";
	let select = document.createElement("select");
	select.name = "usuarios";
	select.id = "usuarios";
	select.form = "miform";
	for(let i = 0; i < usu.length; i++){
		let option = document.createElement("option");
		option.innerHTML = usu[i]['IdUsuario'];
		select.appendChild(option);
	}
	let asuntol = document.createElement("label");
	asuntol.htmlFor = "asunto";
	asuntol.innerHTML = "Asunto: ";
	let asunto = document.createElement("input");
	asunto.type = "text";
	asunto.id = "asunto";
	asunto.name = "asunto";
	let mensajel = document.createElement("label");
	mensajel.htmlFor = "mensaje";
	mensajel.innerHTML = "Mensaje: ";
	let mensaje = document.createElement("textarea");
	mensaje.id = "mensaje";
	mensaje.name = "mensaje";
	let ficherol = document.createElement("label");
	ficherol.htmlFor = "fichero";
	ficherol.innerHTML = "Fichero: ";
	let ficheros = document.createElement("input");
	ficheros.type = "file";
	ficheros.id = "fichero";
	ficheros.name = "fichero";
	let bsubmit = document.createElement("input");
	bsubmit.type = "submit";
	bsubmit.value = "Enviar Mensaje";

	formu.onsubmit = function(){return insertarMensaje();}

	formu.appendChild(selectl);
	formu.appendChild(select);
	formu.appendChild(asuntol);
	formu.appendChild(asunto);
	formu.appendChild(mensajel);
	formu.appendChild(mensaje);
	formu.appendChild(ficherol);
	formu.appendChild(ficheros);
	formu.appendChild(bsubmit);

	return formu;
}

/*
*Parametros: msg, es un array que contiene toda una fila de la tabla mensajes
*
*Crea un formulario con sus respectivos labels donde el destinatario y el asunto es fijo y los coje del parametro msg,
*despues tiene el cuerpo del mensaje, la opcion de añadir 1 fichero y un boton submit que llama a la funcion JavaScript
 */
function responderMensajeFormu(msg) {
	let contenido = document.getElementById("contenido");
	let titulo = document.getElementById("titulo");
	let mensaje_titulo = document.getElementById("mensaje_titulo");
	let mensaje_section = document.getElementById("mensaje");
	let formu = document.createElement("form");
	formu.id = "formu";
	formu.name = "formu";
	formu.method = "POST";
	formu.enctype = "multipart/form-data";
	let destinatariol = document.createElement("label");
	destinatariol.htmlFor = "destino";
	destinatariol.innerHTML = "Para: ";
	let destinatario = document.createElement("input");
	destinatario.type = "text";
	destinatario.name = "destino";
	destinatario.id = "destino";
	destinatario.readOnly = true;
	destinatario.value = msg['Emisor'];
	let asuntol = document.createElement("label");
	asuntol.htmlFor = "asunto";
	asuntol.innerHTML = "Asunto: ";
	let asunto = document.createElement("input");
	asunto.type = "text";
	asunto.id = "asunto";
	asunto.name = "asunto";
	asunto.value = "Re: " + msg['Asunto'];
	asunto.readOnly = true;
	let mensajel = document.createElement("label");
	mensajel.htmlFor = "mensaje";
	mensajel.innerHTML = "Mensaje: ";
	let mensaje = document.createElement("textarea");
	mensaje.id = "mensaje";
	mensaje.name = "mensaje";
	let ficherol = document.createElement("label");
	ficherol.htmlFor = "fichero";
	ficherol.innerHTML = "Fichero: ";
	let ficheros = document.createElement("input");
	ficheros.type = "file";
	ficheros.id = "fichero";
	ficheros.name = "fichero";
	let bsubmit = document.createElement("input");
	bsubmit.type = "submit";
	bsubmit.value = "Enviar Mensaje";

	formu.onsubmit = function(){return responderMensaje();}

	formu.appendChild(destinatariol);
	formu.appendChild(destinatario);
	formu.appendChild(asuntol);
	formu.appendChild(asunto);
	formu.appendChild(mensajel);
	formu.appendChild(mensaje);
	formu.appendChild(ficherol);
	formu.appendChild(ficheros);
	formu.appendChild(bsubmit);

	contenido.innerHTML = "";
	titulo.innerHTML = "Responder Mensaje";
	mensaje_titulo.innerHTML = "";
	mensaje_section.innerHTML = "";
	contenido.appendChild(formu);
}

/*
*Crea un Formulario con 3 campos y sus respectivos labels, la contraseña_actual, la contraseña_nueva y repetir la
*contraseña_nueva y un boton submit que llama a la funcion JavaScript
 */
function cambiarClaveFormu(){
	let contenido = document.getElementById("mensaje");
	let titulo = document.getElementById("mensaje_titulo");

	contenido.style.display = "block";
	titulo.style.display = "block";

	contenido.innerHTML = "";
	titulo.innerHTML = "";
	titulo.innerHTML = "Cambiar Contraseña";

	let formu = document.createElement("form");
	formu.id = "miform";
	formu.name = "miform";
	let antigual = document.createElement("label");
	antigual.htmlFor = "antigua";
	antigual.innerHTML = "Contraseña actual";
	let antigua = document.createElement("input");
	antigua.placeholder = "Contraseña actual";
	antigua.type = "password";
	antigua.name = "antigua";
	antigua.id = "antigua";
	let nueva1l = document.createElement("label");
	nueva1l.htmlFor = "nueva1";
	nueva1l.innerHTML = "Nueva Contraseña";
	let nueva1 = document.createElement("input");
	nueva1.placeholder = "Nueva contraseña";
	nueva1.type = "password";
	nueva1.name = "nueva1";
	nueva1.id = "nueva1";
	let nueva2l = document.createElement("label");
	nueva2l.htmlFor = "nueva2";
	nueva2l.innerHTML = "Repita la nueva contraseña";
	let nueva2 = document.createElement("input");
	nueva2.placeholder = "Repita la nueva contraseña";
	nueva2.type = "password";
	nueva2.name = "nueva2";
	nueva2.id = "nueva2";
	let bsubmit = document.createElement("input");
	bsubmit.type = "submit";
	bsubmit .value = "Cambiar Contraseña";

	formu.onsubmit = function(){return cambiarClave();}

	formu.appendChild(antigual);
	formu.appendChild(antigua);
	formu.appendChild(nueva1l);
	formu.appendChild(nueva1);
	formu.appendChild(nueva2l);
	formu.appendChild(nueva2);
	formu.appendChild(bsubmit);

	contenido.appendChild(formu);
}

/*
*Crea un formulario con sus respectivos labels, tiene un input para seleccionar la nueva imagen y un boton submit que
*llama a la funcion JavaScript
 */
function cambiarAvatarFormu() {
	let contenido = document.getElementById("mensaje");
	let titulo = document.getElementById("mensaje_titulo");

	contenido.style.display = "block";
	titulo.style.display = "block";

	contenido.innerHTML = "";
	titulo.innerHTML = "";
	titulo.innerHTML = "Cambiar Avatar";

	let formu = document.createElement("form");
	formu.id = "miform";
	formu.name = "miform";
	let fotol = document.createElement("label");
	fotol.htmlFor = "foto";
	fotol.innerHTML = "Nueva Foto de Perfil";
	let foto = document.createElement("input");
	foto.type = "file";
	foto.name = "img_nueva";
	foto.id = "img_nueva";
	foto.accept = "image/*";
	let bsubmit = document.createElement("input");
	bsubmit.type = "submit";
	bsubmit .value = "Cambiar Avatar";

	formu.onsubmit = function(){return cambiarAvatar()}

	formu.appendChild(fotol);
	formu.appendChild(foto);
	formu.appendChild(bsubmit);

	contenido.appendChild(formu);
}

/*
*Parametros: usuarios, un array que contiene los IdUsuario de todos los usuarios existentes en la bbdd
*
*Crea un formulario con sus respectivos labels, que contiene un select(cada option es un IdUsuario) y un boton submit
*que llama a la funcion JavaScript
 */
function añadirAmigoFormu(usuarios) {
	if(usuarios.length == 0){
		let texto = document.createElement("p");
		texto.innerHTML = "Todos los usuarios son ya tus amigos";
		return texto;
	}else{
		let formu = document.createElement("form");
		formu.id = "miform";
		formu.name = "miform";
		formu.method = "POST";
		formu.enctype = "multipart/form-data";
		let selectl = document.createElement("label");
		selectl.htmlFor = "usuarios";
		selectl.innerHTML = "Solicitar a: ";
		let select = document.createElement("select");
		select.name = "usuarios";
		select.id = "usuarios";
		select.form = "miform";
		for(let i = 0; i < usuarios.length; i++){
			let option = document.createElement("option");
			option.innerHTML = usuarios[i]['IdUsuario'];
			select.appendChild(option);
		}
		let bsubmit = document.createElement("input");
		bsubmit.type = "submit";
		bsubmit.value = "Solicitar Amistad";

		formu.onsubmit = function(){return crearSolicitudAmistad();}

		formu.appendChild(selectl);
		formu.appendChild(select);
		formu.appendChild(bsubmit);

		return formu;
	}
}