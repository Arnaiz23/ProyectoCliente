// BOTON VOLVER A INDEX.HTML
document.querySelector(".icon-circle-left").addEventListener("click",()=>{
    location.href = "index.html";
});

// PINTAR LOGIN
const pintar = document.querySelector(".container_derecha_informacion_login");
const login = document.querySelector("#login");
const register = document.querySelector("#register");
// const fragmento = document.createDocumentFragment();

// ----------------------------------------------------------------------
window.onload = ()=>{
    pintarRegistro();
    /* if(localStorage.getItem("listaUsuario") != null){
        listaUsuario = JSON.parse(localStorage.getItem("listaUsuario"));
    }else{
        getUsuario().then(valor => {
            listaUsuario = valor;
            localStorage.setItem("listaUsuario",JSON.stringify(listaUsuario))
        })
    } */
}
// ----------------------------------------------------------------------

// CONFIGURACION LOGIN
login.addEventListener("click",()=>{
    pintarLogin();
});


// CONFIGURACION REGISTRO
register.addEventListener("click",()=>{
    pintarRegistro();
});

// FUNCION DE BORRAR
function borrar(){
    pintar.innerHTML = "";
}

// FUNCION PINTAR PREDETERMINADA
function pintarRegistro(){
    borrar();
    pintar.insertAdjacentHTML("beforeend",`
    <label for="user_name">Nombre de usuario</label>
    <input type="text" name="usuario" id="user_name" placeholder="Escribe tu nombre" class="input_datos">
    <label for="password">Contraseña</label>
    <input type="password" name="password" id="password" placeholder="Escribe la contraseña" class="input_datos">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" placeholder="Escribe el email" class="input_datos">
    <div class="container_derecha_informacion_terminos">
        <input type="checkbox" name="terminos" id="terminos">
        <label for="terminos">Acepto los términos y condiciones</label>
    </div>
    <div class="container_derecha_informacion_boton">
        <button type="button" id="boton_sesion_register">REGISTER</button>
        <a href="javascript:void(0)" id="boton_sesion_contrario">Ya tengo cuenta</a>
    </div>
    `);

    // FUNCION REGISTRAR
        let validar_register = document.querySelector("#boton_sesion_register");
        validar_register.addEventListener("click",()=>{
            // alert("Registrado");
            let usuario = document.getElementById("user_name");
            let password = document.getElementById("password");
            let mail = document.getElementById("email");
            let coincidencian,coincidenciae;
            // ---------------------------------------------------------
            fetch("../php/datos.php",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json",
                    "tipo" : "usuarios"
                }
            }).then(function(response){
                if(response.ok){
                    return response.json();
                }else{
                    throw "ERROR EN LA LLAMADA AJAX";
                }
            }).then(function(texto){
                // console.log(texto);
                coincidencian = texto.find(nombre => {
                    return nombre.usuario == usuario.value;
                });
                coincidenciae = texto.find(nombre => {
                    return nombre.correo == mail.value;
                });
                if(usuario.value != "" && mail.value != "" && password.value != ""){
                    if(coincidencian == undefined){
                        if(coincidenciae == undefined){
                            if(terminos.checked){
                                // ------------------------------------------------
                                let datos = `
                                    "usuario" : "${usuario.value}",
                                    "password" : "${password.value}",
                                    "tipo" : "usuario",
                                    "nombre": "",
                                    "apellidos" : "",
                                    "correo" : "${mail.value}",
                                    "direcciones" : 
                                        {
                                            "direccion1" : ""
                                        }
                                `;
                                fetch("../php/datos.php",{
                                    method : "POST",
                                    body : JSON.stringify(datos),
                                    headers : {
                                        "Content-type" : "application/json",
                                        "tipo" :"usuarioNuevo"
                                    }
                                }).then(function(response){
                                    if(response.ok){
                                        return response.text()
                                    }else{
                                        throw "Error en la llamada Ajax";
                                    }
                                }).then(function(texto) {
                                    console.log(texto);
                                    })
                                    .catch(function(err) {
                                        console.log(err);
                                    });
                                // -----------------------------------------------------
                                alert("Registrado");
                                location.href = "index.html";
                                localStorage.setItem("usuario",usuario.value);
                            }else{
                                alert("Hay que aceptar los términos para poder continuar");
                            }
                        }else{
                            alert("Ya hay una cuenta con ese correo");
                        }
                    }else{
                        alert("Este nombre de usuario ya esta en uso");
                    }
                }else{
                    alert("Rellena todos los datos");
                }
            }).catch(function(err){
                console.log(err);
            });
            // -----------------------------------------------------------
            // USUARIOS CON LOCALSTORAGE
            /* let listaUsuario = JSON.parse(localStorage.getItem("listaUsuario"));
            let terminos = document.getElementById("terminos");
            // getUsuario().then(valor => {
                // listaUsuario = valor;
                let coincidencian = listaUsuario.find(nombre => {
                    return nombre.usuario == usuario.value;
                });
                let coincidenciae = listaUsuario.find(nombre => {
                    return nombre.correo == mail.value;
                });
                if(usuario.value != "" && mail.value != "" && password.value != ""){
                    if(coincidencian == undefined){
                        if(coincidenciae == undefined){
                            if(terminos.checked){
                                listaUsuario.push(new Usuario(usuario.value,password.value,"usuario","","",mail.value,""));
                                localStorage.setItem("listaUsuario",JSON.stringify(listaUsuario));
                                alert("Registrado");
                                location.href = "index.html";
                                localStorage.setItem("usuario",usuario.value);
                            }else{
                                alert("Hay que aceptar los términos para poder continuar");
                            }
                        }else{
                            alert("Ya hay una cuenta con ese correo");
                        }
                    }else{
                        alert("Este nombre de usuario ya esta en uso");
                    }
                }else{
                    alert("Rellena todos los datos");
                } */
                
            // });
        });
    
    // FUNCION INICIO
        let inicio = document.querySelector("#boton_sesion_contrario");
        inicio.addEventListener("click",()=>{
            pintarLogin();
        });
}

function pintarLogin(){
    borrar();
    pintar.insertAdjacentHTML("beforeend",`
    <label for="user_name">Nombre de usuario</label>
    <input type="text" name="usuario" id="user_name" placeholder="Escribe tu nombre" class="input_datos">
    <label for="password">Contraseña</label>
    <input type="password" name="password" id="password" placeholder="Escribe la contraseña" class="input_datos">
    <div class="container_derecha_informacion_boton">
        <button type="button" id="boton_sesion_login">LOGIN</button>
        <a href="javascript:void(0)" id="boton_sesion_contrario">No tengo cuenta</a>
    </div>
    `);

    // FUNCION INICIAR SESION
        let validar_login = document.querySelector("#boton_sesion_login");
        let usuario_login = document.getElementById("user_name");
        let password_login = document.getElementById("password");
        validar_login.addEventListener("click",()=>{
            fetch("../php/datos.php",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json",
                    "tipo" : "usuarios"
                }
            }).then(function(response){
                if(response.ok){
                    return response.json();
                }else{
                    throw "ERROR EN LA LLAMADA AJAX"
                }
            }).then(function(texto){
                // console.log(texto):
                let busqueda = texto.find((cuenta) => {
                    return cuenta.usuario == usuario_login.value
                });
                if(busqueda){
                    // if(busqueda.usuario == usuario_login.value){
                        if(busqueda.password == password_login.value){
                            alert("Iniciando");
                            localStorage.setItem("usuario",busqueda.usuario);
                            location.href = "index.html";
                            contador = 1;
                        }else{
                            // alert("contraseña incorrecta");
                            if(password_login.nextElementSibling.classList.contains("datosIncorrectosTexto")){
                                password_login.nextElementSibling.remove();
                            }
                            password_login.classList.add("datosIncorrectos");
                            password_login.insertAdjacentHTML("afterend",`
                                <p class="datosIncorrectosTexto">La contraseña no coincide</p>
                            `);
                            password_login.style.marginBottom = "20px";
                            if(usuario_login.classList.contains("datosIncorrectos")){
                                usuario_login.classList.remove("datosIncorrectos");
                                document.querySelector(".datosIncorrectosTexto").remove();
                            }
                            usuario_login.classList.add("datosCorrectos");
                        }
                    // }
                }else{
                    // alert("usuario no existe");
                    usuario_login.classList.add("datosIncorrectos");
                    usuario_login.insertAdjacentHTML("afterend",`
                        <p class="datosIncorrectosTexto">El usuario no existe</p>
                    `);
                }
            }).catch(function(err){
                console.log(err)
            });
        });
        
    // FUNCION INICIO
        let registro = document.querySelector("#boton_sesion_contrario");
        registro.addEventListener("click",()=>{
            pintarRegistro();
        });
} 
