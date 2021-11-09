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
    getUsuario().then(valor => listaUsuario = valor)
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
            alert("Registrado");
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
            let busqueda = listaUsuario.find((cuenta) => {
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
                        alert("contraseña incorrecta");
                    }
                // }
            }else{
                alert("usuario no existe");
            }

        

            
            /* listaUsuario.forEach(texto => {
                if(texto.usuario == usuario_login.value){
                    if(texto.password == password_login.value){
                        alert("Iniciando");
                        localStorage.setItem("usuario",texto.usuario);
                        location.href = "index.html";
                        contador = 1;
                    }else{
                        alert("contraseña incorrecta");
                    }
                }else{
                    alert("usuario no existe");
                }
            }); */
            // alert("Iniciando");
            // localStorage.setItem("usuario","Adrian");
            // location.href = "index.html";
        });
        

        

    // FUNCION INICIO
        let registro = document.querySelector("#boton_sesion_contrario");
        registro.addEventListener("click",()=>{
            pintarRegistro();
        });
}

