/*
*Esta funcion nos devuelve un formulario para enviar un correo a otro usuario
 */
function cargarUsuarios() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //alert(this.responseType);
            let usus =  JSON.parse(this.responseText);
            let cont = document.getElementById("contenido");
            let titulo= document.getElementById("mensaje_titulo");
            let mensaje = document.getElementById("mensaje");
            let formu = enviarMensaje(usus);
            cont.innerHTML = "";
            titulo.innerHTML = "";
            mensaje.innerHTML = "";
            cont.appendChild(formu);
        }
    };
    xhttp.open("GET", "../PHP/usuarios_json.php", true);
    xhttp.send();
	return false;
}

/*
*Recoje las datos del formulario para enviar mensaje y se los pasa al archivo PHP segun lo que devuelva el archivo esta
*función mostrara un alert u otro
 */
function insertarMensaje(){
    let formu = document.forms.namedItem("miform");
    let params = new FormData(formu);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //alert(this.responseText);
            if(this.responseText==="FALSE"){
                alert("Revise los datos introducidos");
            }else{
                alert("Se ha enviado el mensaje correctamente");
            }
            window.location.reload();
        }
    };
    xhttp.open("POST", "../PHP/enviar_mensaje.php", true);
    xhttp.send(params);
    return false;
}

/*
*Recoje los datos del formulario para responder un mensaje y se los pasa al archivo PHP segun lo que devuelva el archivo
*esta función mostrara un alert u otro
 */
function responderMensaje() {
    let formu = document.forms.namedItem("formu");
    let params = new FormData(formu);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //alert(this.responseText);
            if(this.responseText==="FALSE"){
                alert("Revise los datos introducidos");
            }else{
                alert("Se ha enviado el mensaje correctamente");
            }
            mostrarTabla();
        }
    };
    xhttp.open("POST", "../PHP/responder_mensaje.php", true);
    xhttp.send(params);
    return false;
}