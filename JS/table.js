const token = localStorage.getItem("token");
const tabla = document.querySelector(".tabla-contenido");
const form = document.querySelector(".formulario-clientes");
let contenidoAgregado = false;

if(token == null){
    localStorage.clear();
    location.href="https://clentmanagerweb.onrender.com"
}else{
    cargarDatos();
}

function cargarDatos(){
    const url = "https://rotayoclentmanager.onrender.com/cred"//retorna los datos del usuario
    pantallaDeCarga(true);
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        pantallaDeCarga(false);
        if (!response.ok) {
            localStorage.clear();
            location.href="https://clentmanagerweb.onrender.com"
            throw new Error('Error de red o respuesta no válida');
        }
        return response.json();
    })
    .then(data =>{
        // se guardan datos de usuario
        localStorage.setItem("user", JSON.stringify(data));
    }).then(()=>{
        document.querySelector(".titulo").innerHTML = "Registros de "+JSON.parse(localStorage.getItem("user")).firstname;
        // se obtienen los clientes del usuario guardado
        obtenerClientes();
    }).catch(error =>{
        pantallaDeCarga(false);
        console.log(error);
    })
}

function obtenerClientes(){
    const url = "https://rotayoclentmanager.onrender.com/cliente/obtener"; //Devuelve los clientes del Usuario en sesion
    let userData = JSON.parse(localStorage.getItem("user"));
    if(userData){
        let user = {
            "id": userData.id,
            "country": userData.country,
            "firstname": userData.firstname,
            "lastname": userData.lastname,
            "password": userData.password,
            "role": userData.role,
            "username": userData.username
        }

        pantallaDeCarga(true);
        fetch(url, {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            pantallaDeCarga(false);
            if (!response.ok) {
                throw new Error('Error de red o respuesta no válida');
            }
            return response.json();
        })
        .then(data =>{
            localStorage.setItem("clientes", JSON.stringify(data));
        })
        .then(()=>{
            imprimirClientes();
        })
        .catch(error => {
            pantallaDeCarga(false);
            console.error(error);
        });
    }
}

function imprimirClientes(){
    const clientes = JSON.parse(localStorage.getItem("clientes"));
    let datos = "";

    if(clientes.length == 0){
        datos =`
        <tr>
            <td style="text-align: center;" colspan="6">
                No tienes ningún registro, agrega uno.
            </td>
        </tr>
        `
    } else{
        clientes.forEach(cliente => {
            datos += `
                <tr>
                    <td>${cliente.id}</td>
                    <td>${cliente.firstname}</td>
                    <td>${cliente.lastname}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.phone}</td>
                    <td><a href="table-editar.html?id=${cliente.id}
                    &nombre=${cliente.firstname}
                    &apellido=${cliente.lastname}
                    &email=${cliente.email}
                    &telefono=${cliente.phone}" class="btnEditar">Editar</a></td>
                    <td><button onclick='eliminar(${cliente.id})' class="btnEliminar">Eliminar</button></td>
                </tr>
            `
        });
    }
    tabla.innerHTML = datos;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const url = "https://rotayoclentmanager.onrender.com/cliente" //Agrega un cliente a la base de datos 

    let userData = JSON.parse(localStorage.getItem("user"));

    const nombre = document.querySelector(".firstname").value;
    const apellido = document.querySelector(".lastname").value;
    const correo = document.querySelector(".email").value;
    const telefono = document.querySelector(".phone").value;

    let cliente = {
        "user": {
            "id": userData.id,
            "country": userData.country,
            "firstname": userData.firstname,
            "lastname": userData.lastname,
            "password": userData.password,
            "role": userData.role,
            "username": userData.username
        },
        "firstname": nombre,
        "lastname": apellido,
        "email": correo,
        "phone": telefono
    }

    pantallaDeCarga(true);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(response =>{
        pantallaDeCarga(false);
        if(!response.ok){
            throw new Error("Error de red o respuesta no valida");
        }
    })
    .then(() =>{
        obtenerClientes();
    })
    .then(() =>{
        document.querySelector(".firstname").value = "";
        document.querySelector(".lastname").value = "";
        document.querySelector(".email").value = "";
        document.querySelector(".phone").value = "";
    }).catch(error => {
        pantallaDeCarga(false);
        console.log(error);
    });
});

function eliminar(id){
    const url = "https://rotayoclentmanager.onrender.com/cliente/"+id; //Eliminar un cliente de la base de datos

    pantallaDeCarga(true);

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        pantallaDeCarga(false);
        if(!response.ok){
            throw new Error("Error de red o respuesta no valida");
        }
    })
    .then(() =>{
        obtenerClientes();
    }).catch(error => {
        pantallaDeCarga(false);
        console.log(error);
    });
}

function salir(){
    localStorage.clear();
    location.href="https://clentmanagerweb.onrender.com"
}

function pantallaDeCarga(boolean) {
    if(!contenidoAgregado){
        let contenido = document.querySelector(".contenedor-dinamico");
        contenido.innerHTML += `
            <div id="ventanaDeCarga">
                <p>Cargando...</p>
                <img src="../img/loading.gif" class="loadingCircle">
            </div>
            <style>
                #ventanaDeCarga{
                    display: none;
                    text-align: center;
                    color: var(--color4);
                    height: 170px;
                    width: 400px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    background-color: var(--color1);
                    box-shadow: 0px 0px 0px 100vh rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    transform: translate(-50%, -50%);
                }
                .loadingCircle{
                    width: auto;
                    height: 70px;
                }
            </style>
        `
        contenidoAgregado = true;
    }
    

    let cuerpo = document.getElementById("cuerpo");
    let ventana = document.getElementById("ventanaDeCarga");

    if(boolean){
        cuerpo.style.pointerEvents = 'none';
        ventana.style.display = 'inline-block';
    } else{
        cuerpo.style.pointerEvents = 'all';
        ventana.style.display = 'none';
    }
}
