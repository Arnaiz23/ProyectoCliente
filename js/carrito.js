const contenedor = document.querySelector(".main_container_izquierda");
if(localStorage.getItem("carrito") == null){
    var carrito = [];
    var precio = 0;
}else{
    precio = 0;
    var carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.forEach(producto => precio += parseFloat(producto.precio));
}

function pintarCarrito(){
    if(carrito.length != 0){
        carrito.forEach(producto => {
            contenedor.insertAdjacentHTML("afterbegin",`
            <div class="main_container_izquierda_articulo">
                <img src="${producto.imagen}" alt="">
                <h3 class="articulo_subtitulo">${producto.nombre}</h3>
                <p class="articulo_cantidad">Cantidad: ${producto.cantidad}</p>
                <span class="icon-bin" onclick="eliminarProducto()"></span>
            </div>
            <div class="linea"></div>
            `);
        });
    }else{
        contenedor.insertAdjacentHTML("afterbegin",`
            <h2 id="carrito_vacio">El carrito esta vacío actualmente</h2>
        `);
        document.querySelector(".main_container_izquierda_comprar p").style.cursor = "not-allowed";
    }
}
if(location.href.includes("carrito.html")){
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
}

function addCarrito(){
    let producto = { "imagen" : event.target.dato.imagen, "nombre" : event.target.dato.nombre, "cantidad" : event.target.dato2.value, "precio" : (parseFloat(event.target.dato.precio) * event.target.dato2.value)};
    carrito.push(producto);
    localStorage.setItem("carrito",JSON.stringify(carrito))
    precio += (parseFloat(event.target.dato.precio) * event.target.dato2.value);
    let contenedor_precio = document.querySelectorAll(".main_container_derecha_carrito p");
    contenedor_precio[1].innerHTML = `${precio.toFixed(2)}€`;
    // console.log(event.target.dato)
}

// CAMBIAR CANTIDAD DEL PRODUCTO
function masCantidad(){
    event.target.nextElementSibling.value++;
}
function menosCantidad(){
    event.target.previousElementSibling.value--;
}

// ELIMINAR PRODUCTO
function eliminarProducto(){
    let nombre = event.target.parentElement.children[1].textContent;
    let valor;
    let producto = carrito.find((texto,indice) => {
        valor = indice;
        return texto.nombre == nombre;
    })
    carrito.splice(valor,1);
    localStorage.setItem("carrito",JSON.stringify(carrito))
    let articulo = document.querySelectorAll(".main_container_izquierda_articulo");
    contenedor.innerHTML = `
        <div class="main_container_izquierda_comprar">
            <p>Realizar pedido</p>
        </div>`;
    precio -= (parseFloat(producto.precio) * producto.cantidad);
    let contenedor_precio = document.querySelectorAll(".main_container_derecha_carrito p");
    contenedor_precio[1].innerHTML = `${precio.toFixed(2)}€`;
    pintarCarrito();
}

let realizarPedido = document.querySelector(".main_container_izquierda_comprar p");

realizarPedido.addEventListener("click",()=>{
    let carrito = localStorage.getItem("carrito");
    localStorage.setItem("mispedidos",carrito);
    contenedor.insertAdjacentHTML("afterend",`
        
    `);
});