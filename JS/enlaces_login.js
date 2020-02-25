/*
*Recoje las datos del formulario OlvidadaFormu() y se los pasa al archivo PHP segun lo que devuelva se mostrara un alert
*u otro
 */
function claveOlvidada(){
	let formu = document.forms.namedItem("miform");
	let params = new FormData(formu);
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			//alert(this.responseText);
			if(this.responseText==="FALSE"){
				alert("Revise email");
			}else{
				alert("Se ha enviado un mensaje con la nueva contraseña, la podrá cambiar");
			}
			window.location.reload();
		}
	};
	xhttp.open("POST", "../PHP/olvidadaContraseña.php", true);
	xhttp.send(params);				
	return false;
}

/*
*Recoje las datos del formulario NuevoUsuFormulario() y se los pasa al archivo PHP segun lo que devuelva se mostrara un
*alert u otro
 */
function nuevoUsuario(){
	let formu = document.forms.namedItem("miform");
	let params = new FormData(formu);
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			//alert(this.responseText);
			if(this.responseText==="FALSE"){
				alert("Revise los datos introducidos");
			}else{
				alert("Se ha registrado correctamente")				
			}
			window.location.reload();
		}
	};
	xhttp.open("POST", "../PHP/nuevosUsuario.php", true);
	xhttp.send(params);				
	return false;
}