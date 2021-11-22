const futbol = document.getElementById("futbol");
const baloncesto = document.getElementById("baloncesto");
const voleibol = document.getElementById("voleibol");
const running = document.getElementById("running");

let contenedorIzquierdo = document.querySelector(".main_container_izquierda_tarjetas");

// FUNCION PARA PINTAR LA TARJETA SIN DATOS
function pintarTarjeta(){
    if(localStorage.getItem("usuario") != null && localStorage.getItem("usuario") != "admin"){
        contenedorIzquierdo.insertAdjacentHTML("beforeend",`
            <div class="card">
                <img src="" alt="" class="card_imagenes" onclick="mostrarProducto()">
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
                <img src="" alt="" class="card_imagenes" onclick="mostrarProducto()">
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

// FUNCION PARA PINTAR LOS DATOS JUNTO CON LAS TARJETAS
function pintarTabla(lista){
    lista.forEach((texto,indice) => {
        pintarTarjeta();
        let imagen = document.querySelectorAll(".card_imagenes")[indice];
        let titulo_tarjeta = document.querySelectorAll(".card_informacion_titulo")[indice];
        let parrafo_tarjeta = document.querySelectorAll(".card_informacion_texto")[indice];
        let precio = document.querySelectorAll(".card_informacion_precio p")[indice];
        if(localStorage.getItem("usuario") != null && localStorage.getItem("usuario") != "admin"){
            let boton = document.querySelectorAll(".card_informacion_add p")[indice];
            let cantidad = document.querySelectorAll(".cantidadTarjeta")[indice];
            boton.parentElement.dato = texto;
            boton.dato = texto;
            boton.dato2 = cantidad;
            boton.parentElement.dato2 = cantidad;
        }
        imagen.src = texto.imagen;
        imagen.objeto = texto;
        titulo_tarjeta.innerHTML = texto.nombre;
        parrafo_tarjeta.innerHTML = texto.descripcionCorta;
        precio.innerHTML = texto.precio+"€";
    });
}

// PINTAR DEPENDIENDO DEL DEPORTE
futbol.addEventListener("click",async ()=>{
    await Deporte("futbol");
    localStorage.setItem("indice","0");
    regresarFiltro();
});
baloncesto.addEventListener("click",async ()=>{
    await Deporte("baloncesto");
    localStorage.setItem("indice","1");
    regresarFiltro();
});
voleibol.addEventListener("click",async ()=>{
    await Deporte("voleibol");
    localStorage.setItem("indice","2");
    regresarFiltro();
});
running.addEventListener("click",async ()=>{
    await Deporte("running");
    localStorage.setItem("indice","3");
    regresarFiltro();
});

// FUNCION PARA BORRAR LAS TARJETAS
function borrarTarjetas(){
    let tarjeta = document.querySelectorAll(".card");
    tarjeta.forEach((texto,indice)=>{
        contenedorIzquierdo.removeChild(tarjeta[indice]);
    })
}

// FUNCION MOSTRAR EL PRODUCTO
function mostrarProducto(){
    localStorage.setItem("producto",JSON.stringify(event.target.objeto));
    location.href = "producto.html";
}