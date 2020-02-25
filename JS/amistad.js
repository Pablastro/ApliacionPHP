/*
*Modifica el elemento section con id contenido metiendo en este dos div uno colocado a la izquierda que contendra
*la lista de los amigos y otro a la derecha con 2 opciones Solicitudes de Amistad y Añadir Amigo y el elemento h1 con
*id titulo le mete el texto Amigos
 */
function amistad() {
    let titulo = document.getElementById("titulo");
    let cont = document.getElementById("contenido");
    let msg = document.getElementById("mensaje");
    let msg_tittle = document.getElementById("mensaje_titulo");

    let opciones = document.createElement("div");
    let amigos = document.createElement("div");

    amigos.id = "amigos";

    let enlaceSolicitudes = document.createElement("a");
    enlaceSolicitudes.innerHTML = "Solicitudes de Amistad";
    enlaceSolicitudes.href = "#";
    enlaceSolicitudes.onclick = function(){return ver_solicitudes();}

    let salto = document.createElement("br");

    let addAmigo = document.createElement("a");
    addAmigo.innerHTML = "Añadir amigo";
    addAmigo.href = "#";
    addAmigo.onclick = function(){return solicitar_amistad();}

    opciones.appendChild(enlaceSolicitudes);
    opciones.appendChild(salto);
    opciones.appendChild(addAmigo);

    ver_lista_amigos();

    titulo.innerHTML = "Amigos";
    cont.innerHTML = "";
    amigos.style.cssFloat = "left";
    opciones.style.cssFloat = "right";
    msg.style.display = "block";
    msg.innerHTML = "";
    msg_tittle.innerHTML = "";
    msg_tittle.style.display = "none";

    cont.appendChild(amigos);
    cont.appendChild(opciones);
}

/*
*Nos muestra en la etiqueta section con id mensaje una tabla con las solicitudes de amistad
*y en el elemento section con id mensaje_titulo le metemos el texto Solicitudes de Amistad
 */
function ver_solicitudes() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let solicitudes =  JSON.parse(this.responseText);
            let titulo = document.getElementById("mensaje_titulo");
            let cont = document.getElementById("mensaje");
            let tabla = crearTablaAmistad(solicitudes);
            titulo.style.display = "block";
            titulo.innerHTML = "Solicitudes de Amistad";
            cont.innerHTML = "";
            cont.appendChild(tabla);
        }
    };
    xhttp.open("GET", "../PHP/amistad_json.php", true);
    xhttp.send();
    return false;
}

/*
*Nos muestra en la etiqueta section con id mensaje un formulario, este contiene un select con los Idusuario
*de aquellos usuarios que no son aun nuestros amigos, y en el elemento section con id mensaje_titulo le metemos
*el texto Solicitar Amistad
 */
function solicitar_amistad() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        //console.log(this.responseText);
        if (this.readyState === 4 && this.status === 200) {
            let usuarios =  JSON.parse(this.responseText);
            let titulo = document.getElementById("mensaje_titulo");
            let cont = document.getElementById("mensaje");
            let formu = añadirAmigoFormu(usuarios);
            titulo.innerHTML = "";
            cont.innerHTML = "";
            titulo.style.display = "block";
            titulo.innerHTML = "Solicitar amistad";
            cont.appendChild(formu);
        }
    };
    xhttp.open("GET", "../PHP/solicitar_amistad_json.php", true);
    xhttp.send();
    return false;
}

/*
*Nos muestra en la etiqueta div con id amigos una lista de nuestros Amigos
 */
function ver_lista_amigos() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let amigos =  JSON.parse(this.responseText);
            let lista_contenedor = document.getElementById("amigos");
            let lista = crearListaAmigos(amigos);
            lista_contenedor.appendChild(lista);
        }
    };
    xhttp.open("GET", "../PHP/amigos_json.php", true);
    xhttp.send();
    return false;
}

/*
*Esta función es llamada cuando pulsamos el bóton del formulario de solicitar_amistad y enviamos el Idusuario al
*documento PHP segun lo que devuelve este fichero PHP enviamos un alert.
 */
function crearSolicitudAmistad() {
    let xhttp = new XMLHttpRequest();
    let formu = document.forms.namedItem("miform");
    let params = new FormData(formu);
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText === "TRUE"){
                alert("Se ha enviado una solicitud de amistad");
            }else{
                alert("Ha ocurrido un error");
            }
            window.location.reload();
        }
    };
    xhttp.open("POST", "../PHP/crear_solicitud.php", true);
    xhttp.send(params);
    return false;
}

/*
*Parametros: IdUsuario
*
*Esta función es llamada cuando pulsamos el bóton Aceptar solicitud de la tabla ver_solicitudes enviamos el Idusuario al
*documento PHP segun lo que devuelve este fichero PHP enviamos un alert.
 */
function aceptar_solicitud(usuario){
    let params = new FormData();
    params.append('usuario', usuario);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            if(this.responseText === "TRUE"){
                alert("Se ha añadido como amigo a " + usuario);
            }else{
                alert("Ha ocurrido un error");
            }
            window.location.reload();
        }
    };
    xhttp.open("POST", "../PHP/aceptar_solicitud.php", true);
    xhttp.send(params);
    return false;
}

/*
*Parametros: IdUsuario
*
*Esta función es llamada cuando pulsamos el bóton Denegar solicitud de la tabla ver_solicitudes enviamos el Idusuario al
*documento PHP segun lo que devuelve este fichero PHP enviamos un alert.
 */
function rechazar_solicitud(usuario){
    let params = new FormData();
    params.append('usuario', usuario);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //console.log(this.responseText);
            if(this.responseText === "TRUE"){
                alert("Se ha rechazado la solicitud de amistad de " + usuario);
            }else{
                alert("Ha ocurrido un error");
            }
            window.location.reload();
        }
    };
    xhttp.open("POST", "../PHP/rechazar_solicitud.php", true);
    xhttp.send(params);
    return false;
}

/*
*Parametros: array donde se guardan los amigos de la variable $_SESSION['usuario']['Correo']
*
*Mediante esta función creamos una lista desordenada que cada elemento li va a ser un elemento a con texto IdUsuario
*y que al pulsar en este llama a una función para mostrar el perfil de esa persona.
 */
function crearListaAmigos(amigos) {
    let lista = document.createElement("ul");
    lista.style.listStyleType = "square";

    for (let i = 0; i < amigos.length; i++) {
        let elem = document.createElement("a");
        let enlace = document.createElement("li");
        elem.innerHTML = amigos[i]['IdUsuario'];
        elem.href = "#";
        elem.onclick = function(){return mostrarPerfilAmigo(amigos[i]['IdUsuario']);}

        enlace.appendChild(elem);
        lista.appendChild(enlace);
    }

    return lista;
}

/*
*Parametros: IdUsario de un amigo
*
*Mediante esta función introducimos en el elemento h1 con id mensaje_titulo el texto Perfil de IdUsuario y en el
*elemento section con id mensaje introduciremos lo que nos devuelve la funcion crearPerfil()
 */
function mostrarPerfilAmigo(usuario) {
    let xhttp = new XMLHttpRequest();
    let params = new FormData();
    params.append('Usuario', usuario);
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let perfil_amigo =  JSON.parse(this.responseText);
            let cabezera = document.getElementById("mensaje_titulo");
            let lugar = document.getElementById("mensaje");
            let completo = crearPerfil(perfil_amigo);
            cabezera.style.display = "block";
            cabezera.innerHTML = "Perfil de " + usuario;
            lugar.innerHTML = "";
            lugar.appendChild(completo);
        }
    };
    xhttp.open("POST", "../PHP/mostrar_perfil_amigo_json.php", true);
    xhttp.send(params);
    return false;
}

/*
*Parametros: IdUsuario de un amigo
*
*Mediante esta función creamos un elemento div en el cuál introduciremos los datos de este IdUsuario
 */
function crearPerfil(usuario) {
    let perfil = document.createElement("div");

    let avatar = document.createElement("img");
    avatar.src = "../BD/Ficheros/Avatares/" + usuario['Avatar'];
    avatar.id = "imagen";
    let nombre_apellidos = document.createElement("p");
    nombre_apellidos.innerHTML = "Nombre y Apellidos: " + usuario['Nombre'] + " " + usuario['Apellidos'];
    let f_nac = document.createElement("p");
    f_nac.innerHTML = "Fecha nacimiento: " + usuario['FechaNacimiento'];
    let telefono = document.createElement("p");
    telefono.innerHTML = "Telefono: " + usuario['Telefono'];
    let direccion = document.createElement("p");
    direccion.innerHTML = "Direccion: " + usuario['Direccion'];
    let cerrar = document.createElement("input");
    cerrar.type = "button";
    cerrar.value = "Cerrar perfil";
    cerrar.onclick = function(){return window.location.reload();}

    perfil.appendChild(avatar);
    perfil.appendChild(nombre_apellidos);
    perfil.appendChild(f_nac);
    perfil.appendChild(telefono);
    perfil.appendChild(direccion);
    perfil.appendChild(cerrar);

    return perfil;
}

/*
*Parametros: array donde se guardan las solicitudes de amistad
*
*Mediante esta función creamos una tabla donde irán todas las solicitudes de amistad que se han realizado al usuario
*iniciado
 */
function crearTablaAmistad(solicitudes){
    let tabla = document.createElement("table");
    if (solicitudes.length == 0) {
        tabla.innerHTML = "No tienes solicitudes";
    } else {
        for (let  i = 0; i < solicitudes.length; i++){
            let fila = crear_fila(solicitudes[i]['IdUsuario'], "td");
            tabla.appendChild(fila);
        }
    }
    return tabla;
}

/*
*Parametros: usuario es el IdUsuario del usuario que nos quiere añadir
*            tipo es el tipo de elemento html que utilizaremos dentro de la tabla para meter los datos
*
*Mediante esta función crearemos un elemento tr, dentro de este crearemos un elemento tipo y dentro de tipo
*introduciremos un texto y dos botones, unapara aceptar la solicitud de amistad y otro para denegar la solicitud
*de amistad
 */
function crear_fila(usuario, tipo){
    let fila = document.createElement("tr");
    let celda = document.createElement(tipo);
    celda.innerHTML = "El usuario " + usuario + " te quiere agregar a su lista de amistad";
    let aceptar_caja = document.createElement("td");
    let aceptar = document.createElement("input");
    aceptar.type = "button";
    aceptar.value = "Aceptar solicitud";
    aceptar.onclick = function(){return aceptar_solicitud(usuario);}
    aceptar_caja.appendChild(aceptar);
    let denegar_caja = document.createElement("td");
    let denegar = document.createElement("input");
    denegar.type = "button";
    denegar.value = "Denegar Solicitud";
    denegar.onclick = function(){return rechazar_solicitud(usuario);}
    denegar_caja.appendChild(denegar);

    celda.appendChild(aceptar_caja);
    celda.appendChild(denegar_caja);
    fila.appendChild(celda);

    return fila;
}