const futbol = document.getElementById("futbol");
const baloncesto = document.getElementById("baloncesto");
const voleibol = document.getElementById("voleibol");
const running = document.getElementById("running");

let contenedorIzquierdo = document.querySelector(".main_container_izquierda_tarjetas");

function pintarTarjeta(){
    if(localStorage.getItem("usuario") != null){
        contenedorIzquierdo.insertAdjacentHTML("beforeend",`
            <div class="card">
                <img src="" alt="" class="card_imagenes">
                <div class="card_informacion">
                    <h3 class="card_informacion_titulo"></h3>
                    <p class="card_informacion_texto"></p>
                    <div class="card_informacion_precio">
                        <h3>Precio</h3>
                        <p></p>
                    </div>
                    <div class="card_informacion_carrito">
                        <div class="card_informacion_carrito_cantidad">
                            <button type="button" id="add">+</button>
                            <input type="number" name="cantidad" id="cantidadTarjeta" maxlength="999" minlength="0" value="1">
                            <button type="button" id="remove">-</button>
                        </div>
                        <div class="card_informacion_add">
                            <p>Añadir</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }else{
        contenedorIzquierdo.insertAdjacentHTML("beforeend",`
            <div class="card">
                <img src="" alt="" class="card_imagenes">
                <div class="card_informacion">
                    <h3 class="card_informacion_titulo"></h3>
                    <p class="card_informacion_texto"></p>
                    <div class="card_informacion_precio">
                        <h3>Precio</h3>
                        <p></p>
                    </div>
                </div>
            </div>
        `);
    }
}

function pintarTabla(lista){
    lista.forEach((texto,indice) => {
        pintarTarjeta();
        let imagen = document.querySelectorAll(".card_imagenes")[indice];
        let titulo_tarjeta = document.querySelectorAll(".card_informacion_titulo")[indice];
        let parrafo_tarjeta = document.querySelectorAll(".card_informacion_texto")[indice];
        let precio = document.querySelectorAll(".card_informacion_precio p")[indice];
        imagen.src = texto.imagen;
        titulo_tarjeta.innerHTML = texto.nombre;
        parrafo_tarjeta.innerHTML = texto.descripcionCorta;
        precio.innerHTML = texto.precio;
    });
}

futbol.addEventListener("click",()=>{
    borrarTarjetas();
    pintarTabla(listaf);
    eliminarMarca();
    insertarMarca(listaf);
    eliminarTipo();
    insertarTipo(listaf);
    localStorage.setItem("lista",JSON.stringify(listaf));
    regresarFiltro();
});
baloncesto.addEventListener("click",()=>{
    borrarTarjetas();
    pintarTabla(listab);
    eliminarMarca();
    insertarMarca(listab);
    eliminarTipo();
    insertarTipo(listab);
    localStorage.setItem("lista",JSON.stringify(listab));
    regresarFiltro();
});
voleibol.addEventListener("click",()=>{
    borrarTarjetas();
    pintarTabla(listav);
    eliminarMarca();
    insertarMarca(listav);
    eliminarTipo();
    insertarTipo(listav);
    localStorage.setItem("lista",JSON.stringify(listav));
    regresarFiltro();
});
running.addEventListener("click",()=>{
    borrarTarjetas();
    pintarTabla(listar);
    eliminarMarca();
    insertarMarca(listar);
    eliminarTipo();
    insertarTipo(listar);
    localStorage.setItem("lista",JSON.stringify(listar));
    regresarFiltro();
});

function borrarTarjetas(){
    let tarjeta = document.querySelectorAll(".card");
    tarjeta.forEach((texto,indice)=>{
        contenedorIzquierdo.removeChild(tarjeta[indice]);
    })
}