const contenido = document.querySelector(".contenedor-table-editar");
const formEditor = document.querySelector(".formulario-editar-clientes");

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

    fetch(url, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error("Error de red o respuesta no valida")
        }
        return response;
    })
};