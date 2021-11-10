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
                            <button type="button" class="add" onclick="masCantidad()">+</button>
                            <input type="number" name="cantidad" class="cantidadTarjeta" maxlength="999" minlength="0" value="1">
                            <button type="button" class="remove" onclick="menosCantidad()">-</button>
                        </div>
                        <div class="card_informacion_add" onclick="addCarrito()">
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
        if(localStorage.getItem("usuario") != null){
            let boton = document.querySelectorAll(".card_informacion_add p")[indice];
            let cantidad = document.querySelectorAll(".cantidadTarjeta")[indice];
            boton.parentElement.dato = texto;
            boton.dato = texto;
            boton.dato2 = cantidad;
            boton.parentElement.dato2 = cantidad;
        }
        imagen.src = texto.imagen;
        titulo_tarjeta.innerHTML = texto.nombre;
        parrafo_tarjeta.innerHTML = texto.descripcionCorta;
        precio.innerHTML = texto.precio+"€";
    });
}

futbol.addEventListener("click",()=>{
    getInfo().then(deporte =>{
        borrarTarjetas();
        pintarTabla(deporte[0]);
        eliminarMarca();
        insertarMarca(deporte[0]);
        eliminarTipo();
        insertarTipo(deporte[0]);
        localStorage.setItem("indice","0");
    });
    regresarFiltro();
});
baloncesto.addEventListener("click",()=>{
    getInfo().then(deporte =>{
        borrarTarjetas();
        pintarTabla(deporte[1]);
        eliminarMarca();
        insertarMarca(deporte[1]);
        eliminarTipo();
        insertarTipo(deporte[1]);
        localStorage.setItem("indice","1");
    });
    regresarFiltro();
});
voleibol.addEventListener("click",()=>{
    getInfo().then(deporte =>{
        borrarTarjetas();
        pintarTabla(deporte[2]);
        eliminarMarca();
        insertarMarca(deporte[2]);
        eliminarTipo();
        insertarTipo(deporte[2]);
        localStorage.setItem("indice","2");
    });
    regresarFiltro();
});
running.addEventListener("click",()=>{
    getInfo().then(deporte =>{
        borrarTarjetas();
        pintarTabla(deporte[3]);
        eliminarMarca();
        insertarMarca(deporte[3]);
        eliminarTipo();
        insertarTipo(deporte[3]);
        localStorage.setItem("indice","3");
    });
    regresarFiltro();
});

function borrarTarjetas(){
    let tarjeta = document.querySelectorAll(".card");
    tarjeta.forEach((texto,indice)=>{
        contenedorIzquierdo.removeChild(tarjeta[indice]);
    })
}