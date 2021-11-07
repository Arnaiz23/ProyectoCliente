const contenedor_precio = document.querySelector(".main_container_derecha_carrito");

window.onload = async ()=>{
    if(location.href != "http://localhost:8080/preguntas.html" && location.href != "http://localhost:8080/carrito.html"){
        getInfo();
        getUsuario();

        // USUARIO
        if(localStorage.getItem("usuario") != null){
            let boton_administracion = document.querySelector(".header_nav_opciones_inicio");
            let listaUsuario = JSON.parse(localStorage.getItem("listaUsuario"))
            listaUsuario.forEach(texto => {
                // console.log(texto)
                if(texto.tipo == "admin" && texto.usuario == localStorage.getItem("usuario")){
                    // if(localStorage.getItem("usuario") == texto.usuario){
                        boton_administracion.innerHTML = `
                        <a href="admin.html" id="administrar_sesion"><span class="icon-cog"></span>ADMIN</a>
                        `;
                    // }
                }else{
                    boton_administracion.innerHTML = `
                        <a href="administrar.html"><span class="icon-user"></span>MI CUENTA</a>
                    `;
                }
            });
            // Sustituir el 0 por una variable del precio
            contenedor_precio.insertAdjacentHTML("beforeend",`
                <p>0 €</p>
            `);
        }else{
            contenedor_precio.innerHTML = "<p>Inicia sesión para acceder</p>";
        }
    }else{
        if(localStorage.getItem("usuario") != null){
            let boton_administracion = document.querySelector(".header_nav_opciones_inicio");
            
            if(localStorage.getItem("usuario") == "admin"){
                boton_administracion.innerHTML = `
                <a href="admin.html" id="administrar_sesion"><span class="icon-cog"></span>ADMIN</a>
                `;
            }else{
                boton_administracion.innerHTML = `
                    <a href="administrar.html"><span class="icon-user"></span>MI CUENTA</a>
                `;
            }
        }
    }
}