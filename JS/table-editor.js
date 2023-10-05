const contenido = document.querySelector(".contenedor-table-editar");
const formEditor = document.querySelector(".formulario-editar-clientes");
let contenidoAgregado = false;

const urlParams = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(".firstname-edit").value = urlParams.get("nombre").trim();
    document.querySelector(".lastname-edit").value = urlParams.get("apellido").trim();
    document.querySelector(".email-edit").value = urlParams.get("email").trim();
    document.querySelector(".phone-edit").value = urlParams.get("telefono").trim();
});

formEditor.addEventListener('submit', e => {
    e.preventDefault();
    const id = urlParams.get("id").trim();
    const nombreEditor = document.querySelector(".firstname-edit").value;
    const apellidoEditor = document.querySelector(".lastname-edit").value;
    const correoEditor = document.querySelector(".email-edit").value;
    const telefonoEditor = document.querySelector(".phone-edit").value;
    editar(id, nombreEditor, apellidoEditor, correoEditor, telefonoEditor);
    location.href="table.html"
})

function editar(id, nombre, apellido, correo, telefono){
    const url = "https://rotayoclentmanager.onrender.com/cliente/"+id;
    let userData = JSON.parse(localStorage.getItem("user"));

    let datos = {
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
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response =>{
        pantallaDeCarga(false);
        if(!response.ok){
            throw new Error("Error de red o respuesta no valida")
        }
        return response;
    }).catch(error =>{
        pantallaDeCarga(false);
        console.log(error);
    })
}

function pantallaDeCarga(boolean) {
    if(!contenidoAgregado){
        let contenido = document.querySelector(".contenedor-dinamico");
        contenido.innerHTML += `
            <div id="ventanaDeCarga">
                <p>Cargando...</p>
                <img src="img/loading.gif" class="loadingCircle">
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