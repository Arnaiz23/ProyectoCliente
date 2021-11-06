const contenedor_precio = document.querySelector(".main_container_derecha_carrito");

window.onload = ()=>{
    getInfo();

    // USUARIO
    if(sessionStorage.getItem("usuario") != null){
        let boton_administracion = document.querySelector(".header_nav_opciones_inicio");
        boton_administracion.innerHTML = `
            <a href="administrar.html"><span class="icon-user"></span>MI CUENTA</a>
        `;
        // Sustituir el 0 por una variable del precio
        contenedor_precio.insertAdjacentHTML("beforeend",`
            <p>0 €</p>
        `);
    }else{
        contenedor_precio.innerHTML = "<p>Inicia sesión para acceder</p>";
    }
}