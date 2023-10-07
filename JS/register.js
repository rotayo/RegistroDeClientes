const form = document.querySelector(".usuarioForm-register");
let contenidoAgregado = false;

function register(){
    const url = "https://rotayoclentmanager.onrender.com/auth/register"; //Registra usuario y devuelve token

    let firstname = document.querySelector(".firstnameInput-register").value.trim();
    let lastname = document.querySelector(".lastnameInput-register").value.trim();
    let username = document.querySelector(".usernameInput-register").value.trim();
    let password = document.querySelector(".passwordInput-register").value.trim();
    let country = document.querySelector(".countryInput-register").value.trim();

    if(firstname != "" 
        && lastname != ""
        && username != ""
        && password != ""
        && country != ""){
            var user = {
                "username": username,
                "password": password,
                "lastname": lastname,
                "firstname": firstname,
                "country": country
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
                if(response.ok){
                    alert("Cuenta creada con exito");
                    location.href="https://clentmanagerweb.onrender.com"
                }else{
                    let error = document.getElementById("mensajeError-register");
                    error.style.display = 'block';
                }
            }).catch(error => {
                pantallaDeCarga(false);
                console.error(error);
            });
        }
}

form.addEventListener('submit', e =>{
    e.preventDefault();
    register();
});

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
