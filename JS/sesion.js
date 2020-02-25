/*
*Cuando se llama a este función el PHP destruyes la variable $_SESSION['usuario'] y la cookie después vuelve al login
 */
function cerrarSesionUnaPagina(){
		/*cerrar sesión*/
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			/*cambiar visibilidades de las secciones*/
			document.getElementById("principal").style.display= "none";
			document.getElementById("login").style.display= "block";
			document.getElementById("contenido").innerHTML = "";
			alert("Sesion cerrada con éxito");									
		}};
		xhttp.open("GET", "../PHP/logout_json.php", true);
		xhttp.send();		
	return false;
}

/*
*Se comprueba si se ha creado la variable $_SESSION['usuario'] si es asi muestra la tabla recibidos
*en caso contrario te sale un alert para que revises Usuario y Contraseña
 */
function login(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			//alert(this.responseText);
			if(this.responseText==="FALSE"){
				alert("Revise usuario y contraseña");
			}else{
				//console.log(this.responseText);
				document.getElementById("principal").style.display= "block";
				document.getElementById("login").style.display= "none";
				document.getElementById("titulo").innerHTML = "";
				document.getElementById("mensaje_titulo").innerHTML = "";
				document.getElementById("mensaje").innerHTML = "";
				/*ponemos el usuario devuelto en el hueco correspondiente*/		
				document.getElementById("cab_usuario").innerHTML = "Correo: " + correo;
				let enlace = document.getElementById("usuario");
				let imagen = document.createElement("img");
				imagen.src = "../BD/Ficheros/Avatares/" + this.responseText;
				imagen.id = "imagen";
				enlace.innerHTML = "";
				enlace.style.cssFloat = "right";
				enlace.appendChild(imagen);
				mostrarTabla();
			}
		}
	};
	let correo = document.getElementById("correo").value;
	let clave = document.getElementById("clave").value;
	let params = "correo="+correo+"&clave="+clave;
	xhttp.open("POST", "../PHP/login_json.php", true);
	xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhttp.send(params);				
	return false;
}

/*
*Esta función se llama cada vez que se recarga la página, si existe $_SESSION['usuario'] te vuelve a mostrar la Tabla de
*Recibidos, en caso contrario te muestra el login
 */
window.onload = function () {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			if(this.responseText !== "FALSE"){
				let datos = JSON.parse(this.responseText);
				document.getElementById("principal").style.display= "block";
				document.getElementById("login").style.display= "none";
				document.getElementById("titulo").innerHTML = "";
				document.getElementById("mensaje_titulo").innerHTML = "";
				document.getElementById("mensaje").innerHTML = "";
				/*ponemos el usuario devuelto en el hueco correspondiente*/		
				document.getElementById("cab_usuario").innerHTML = "Correo: " + datos['Correo'];
				let enlace = document.getElementById("usuario");
				let imagen = document.createElement("img");
				imagen.src = "../BD/Ficheros/Avatares/" + datos['Avatar'];
				imagen.id = "imagen";
				enlace.innerHTML = "";
				enlace.style.cssFloat = "right";
				enlace.appendChild(imagen);
				mostrarTabla();
			}else{
				document.getElementById("login").style.display = "block";
			}			
		}};
			
		xhttp.open("GET", "../PHP/sesion_usuario_json.php", true);
		xhttp.send();		
	return false;
}