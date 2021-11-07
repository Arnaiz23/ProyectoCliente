const contenedor = document.querySelector(".main_container_izquierda");

function pintarCarrito(){
    contenedor.insertAdjacentHTML("beforeend",`
    <div class="main_container_izquierda_articulo">
        <img src="${imagen}" alt="">
        <h3 class="articulo_subtitulo">${nombre}</h3>
        <p class="articulo_cantidad">Cantidad:${cantidad}</p>
        <span class="icon-bin"></span>
    </div>
    <div class="linea"></div>
    `);
}

if(localStorage.getItem("usuario") == null){
    document.querySelector("main").insertAdjacentHTML("beforebegin",`
        <div class="contenedor_informativo_logear">
            <div class="contenedor_informativo_logear_texto">
                <p>Lo sentimos, para poder acceder a esta pestaña debes iniciar sesión</p>
                <div class="contenedor_informativo_logear_texto_boton">
                    <button type="button">Iniciar sesion</button>
                </div>
            </div>
        </div>
    `);
    // BOTON REGRESAR POR NO ESTAR LOGEADO
    document.querySelector(".contenedor_informativo_logear_texto_boton button").addEventListener("click",()=>{
        location.href = "login.html";
    });
    document.body.style.overflow = "hidden";
}