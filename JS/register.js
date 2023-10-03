const form = document.querySelector(".usuarioForm-register");

form.addEventListener('submit', e =>{
    e.preventDefault();
    register();
})

function register(){
    const url = "http://localhost:8080/auth/register"; //Registra usuario y devuelve token

    let firstname = document.querySelector(".firstnameInput-register").value.trim();
    let lastname = document.querySelector(".lastnameInput-register").value.trim();
    let username = document.querySelector(".usernameInput-register").value.trim();
    let password = document.querySelector(".passwordInput-register").value.trim();
    let country = document.querySelector(".countryInput-register").value.trim();

    if(firstname !== "" 
        && lastname !== ""
        && username !== ""
        && password !== ""
        && country !== ""){
            var user = {
                "username": username,
                "password": password,
                "lastname": lastname,
                "firstname": firstname,
                "country": country
            }
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                
            }).then(response => {
                if(response.ok){
                    location.href="../index.html"
                }else{
                    let error = document.getElementById("mensajeError-register");
                    error.style.display = 'block';
                }
            });
        }
}