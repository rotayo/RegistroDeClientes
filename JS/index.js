const DOMusuarios = document.querySelector(".DOMusuarios");
const form = document.querySelector(".usuarioForm");
let contenidoAgregado = false;

function login(){
    const url = "https://rotayoclentmanager.onrender.com/auth/login"; //Autoriza Usuario y devuelve token

    let username = document.querySelector(".InputEmail").value.trim();
    let password = document.querySelector(".InputPassword").value.trim();
    
    var user = {
        "username": username,
        "password": password
    }

    pantallaDeCarga(true);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        pantallaDeCarga(false);
        if (response.ok) {
            return response.json();
        } else {
            let error = document.getElementById("mensajeError");
            error.style.display = 'block';
            throw new Error('Authentication failed');
        }
    }).then(data => {
        localStorage.setItem('token', data.token);
        location.href="HTML/table.html"
    }).catch(error => {
        pantallaDeCarga(false);
        console.error(error);
    });
}

form.addEventListener('submit', e=>{
    e.preventDefault();
    login();
})

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