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
    let coincidencia = carrito.find(productos => {
        return productos.nombre == producto.nombre;
    });
    let cantidadActual;
    if(coincidencia){
        cantidadActual = parseInt(coincidencia.cantidad);
        console.log(cantidadActual)
        console.log(producto.cantidad)
        cantidadActual += parseInt(producto.cantidad);
        console.log(cantidadActual)
        coincidencia.cantidad = cantidadActual;
    }else{
        carrito.push(producto);
    }
    // carrito.push(producto);
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

if(location.href.includes("carrito.html")){
    let realizarPedido = document.querySelector(".main_container_izquierda_comprar p");
    realizarPedido.addEventListener("click",async ()=>{
        let usuario;
        await fetch("../php/datos.php",{
            method : "POST",
            headers : {
                "Content-type" : "application/json",
                "tipo" : "usuarios"
            }
        }).then(function(response){
            if(response.ok){
                return response.json();
            }else{
                throw "ERROR EN LA LLAMADA AJAX";
            }
        }).then(function(texto){
            // console.log(texto)
            usuario = texto.find(texto =>{
                return texto.usuario == localStorage.getItem("usuario");
            });
        }).catch(function(err){
            console.log(err);
        });
        usuario = usuario.direcciones;
        let direcciones = "";
        for(direccion in usuario){
            let cont = 1;
            direcciones += `<option value="${cont}">${usuario[direccion]}</option>`;
        }
        if(realizarPedido.style.cursor != "not-allowed"){
            contenedor.insertAdjacentHTML("afterend",`
                <div class="fondo_pedido">
                    <div class="pedido_direccion">
                        <label for="direccionPedido">Elige una dirección</label>
                        <select name="direccion" id="direccionPedido">
                            <option value="0">...</option>
                            ${direcciones}
                        </select>
                        <label for="direccionPedido2">O escribe una nueva</label>
                        <input type="text" name="direccionPedido2" id="direccionPedido2">
                        <div class="botonPagar">Siguiente</div>
                    </div>
                </div>
            `);
            // VALIDACION
            let valorDireccion = document.getElementById("direccionPedido");
            let nuevaDireccion = document.getElementById("direccionPedido2");
            
            let siguiente = document.querySelector(".botonPagar");
            let error = false;
            
            siguiente.addEventListener("click",()=>{
                if(valorDireccion.value == 0 && nuevaDireccion.value == ""){
                    error = true;
                    nuevaDireccion.style.border = "2px solid red";
                    if(nuevaDireccion.nextElementSibling == siguiente){
                        nuevaDireccion.insertAdjacentHTML("afterend",`
                            <p style=color:red;>Selecciona una direccion</p>
                        `);
                    }
                }else{
                    error = false;
                }
                if(!error){
                    document.querySelector(".fondo_pedido").remove();
                    contenedor.insertAdjacentHTML("afterend",`
                        <div class="fondo_pedido">
                            <div class="pedido">
                                <!-- Nombre titular -->
                                <label for="nombreTitular">Nombre del titular</label>
                                <input type="text" name="nombreTitular" id="nombreTitular">
                                <!-- Numero tarjeta -->
                                <label for="numeroTarjeta">Numero de tarjeta</label>
                                <input type="number" name="numeroTarjeta" id="numeroTarjeta">
                                <!-- Fecha -->
                                <label for="fechaTarjeta">Fecha de expiración</label>
                                <input type="date" name="fechaTarjeta" id="fechaTarjeta">
                                <!-- CVC -->
                                <label for="cvcTarjeta">CVC</label>
                                <input type="text" name="cvcTarjeta" id="cvcTarjeta">
                                <p class="botonPagar">Pagar y finalizar</p>
                            </div>
                        </div>
                    `);
                    let pagar = document.querySelector(".botonPagar");
                    let validacion = true;
                    pagar.addEventListener("click",()=>{
                        let fecha = document.getElementById("fechaTarjeta");
                        if(fecha.value == ""){
                            fecha.style.border = "2px solid red";
                            validacion = false;
                        }else{
                            validacion = true;
                        }
                        let nombre = document.getElementById("nombreTitular");
                        if(!validarNombre(nombre)){
                            nombre.style.border = "2px solid red";
                            validacion = false;
                        }else{
                            validacion = true;
                        }
                        let cvc = document.getElementById("cvcTarjeta");
                        if(!validarCVC(cvc)){
                            cvc.style.border = "2px solid red";
                            validacion = false;
                        }else{
                            validacion = true;
                        }
                        let numeroTarjeta = document.getElementById("numeroTarjeta");
                        if(!validarNumero(numeroTarjeta)){
                            numeroTarjeta.style.border = "2px solid red";
                            validacion = false;
                        }else{
                            validacion = true;
                        }
                        if(validacion){
                            let tarjeta = {
                                "nombreTitular" : nombre.value,
                                "numero" : numeroTarjeta.value,
                                "fechaExpiracion" : fecha.value,
                                "cvc" : cvc.value
                            };
                            localStorage.setItem("tarjeta",JSON.stringify(tarjeta));
                            let carrito = localStorage.getItem("carrito");
                            localStorage.setItem("mispedidos",carrito);
                            alert("Pedido realizado");
                            localStorage.removeItem("carrito");
                            location.reload();
                        }
                    });
                }
            });
            
        }
    });
}