const futbol = document.getElementById("futbol");
const baloncesto = document.getElementById("baloncesto");
const voleibol = document.getElementById("voleibol");
const running = document.getElementById("running");

let contenedorIzquierdo = document.querySelector(".main_container_izquierda_tarjetas");

function pintarTarjeta(){
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

function pintarTabla(lista){
    lista.forEach((texto,indice) => {
        pintarTarjeta();
        let imagen = document.querySelectorAll(".card_imagenes")[indice];
        let titulo_tarjeta = document.querySelectorAll(".card_informacion_titulo")[indice];
        let parrafo_tarjeta = document.querySelectorAll(".card_informacion_texto")[indice];
        let precio = document.querySelectorAll(".card_informacion_precio p")[indice];
        imagen.src = texto.imagen;
        titulo_tarjeta.innerHTML = texto.nombre;
        parrafo_tarjeta.innerHTML = texto.tipo;
        precio.innerHTML = texto.precio;
    });
}

futbol.addEventListener("click",()=>{
    borrarTarjetas();
    pintarTabla(listaf);
    eliminarMarca();
    insertarMarca(listaf);
});
baloncesto.addEventListener("click",()=>{
    borrarTarjetas();
    pintarTabla(listab);
    eliminarMarca();
    insertarMarca(listab);
});
voleibol.addEventListener("click",()=>{
    borrarTarjetas();
    pintarTabla(listav);
    eliminarMarca();
    insertarMarca(listav);
});
running.addEventListener("click",()=>{
    borrarTarjetas();
    pintarTabla(listar);
    eliminarMarca();
    insertarMarca(listar);
});

function borrarTarjetas(){
    let tarjeta = document.querySelectorAll(".card");
    tarjeta.forEach((texto,indice)=>{
        contenedorIzquierdo.removeChild(tarjeta[indice]);
    })
}