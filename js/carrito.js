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

