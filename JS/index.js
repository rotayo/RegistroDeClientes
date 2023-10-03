const DOMusuarios = document.querySelector(".DOMusuarios");
const form = document.querySelector(".usuarioForm");

function login(){
    const url = "http://localhost:8080/auth/login"; //Autoriza Usuario y devuelve token

    let username = document.querySelector(".InputEmail").value.trim();
    let password = document.querySelector(".InputPassword").value.trim();
    
    var user = {
        "username": username,
        "password": password
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
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
        console.error(error);
    });
}

form.addEventListener('submit', e=>{
    e.preventDefault();
    login();
})
