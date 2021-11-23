const btnCerrarSesion = document.querySelector(".header_nav_opciones_inicio");
const misPedidos = document.getElementById("misPedidos");
const administrarCuenta = document.getElementById("administrarCuenta");

// FUNCION CERRAR SESION
function cerrarSesion(){
    localStorage.removeItem("usuario");
    localStorage.removeItem("tarjeta");
    localStorage.removeItem("mispedidos");
    localStorage.removeItem("direcciones");
    location.href = "index.html";
}

// FUNCION CERRAR SESION AL MINUTO. SIN USO. PRUEBA
function cerrarSesion2(){
    setTimeout(()=>{
        localStorage.removeItem("usuario");
        location.reload();
    },60000);
    // 1 MINUTO
}

// CERRAR SESION
btnCerrarSesion.addEventListener("click",()=>{
    cerrarSesion();
});

let informacion = document.querySelector(".main_container_derecha");

let usuario;
// BOTON PEDIDOS
administrarCuenta.addEventListener("click",async ()=>{
    await Usuario();
    
    // informacion.insertAdjacentHTML("afterbegin",`
    informacion.innerHTML = `
        <h3>Datos</h3>
        <p>Nombre</p>
        <input type="text" name="nombreAdministracion" id="nombreAdministracion" placeholder="${usuario.nombre}">
        <p>Apellidos</p>
        <input type="text" name="apellidosAdministracion" id="apellidosAdministracion" placeholder="${usuario.apellidos}">
        <p>Correo</p>
        <input type="text" name="correoAdministracion" id="correoAdministracion" placeholder="${usuario.correo}">
        <div class="linea"></div>
        <h3>Contraseña</h3>
        <p>Cambiar contraseña</p>
        <input type="password" name="passwordAdministracion" id="passwordAdministracion">
        <p>Confirmación</p>
        <input type="password" name="passwordAdministracion2" id="passwordAdministracion2">
        <button type="button" id="actualizarCuenta" onclick="actualizarCuenta()">Actualizar</button>
        <div class="linea"></div>
        <h3>Eliminar cuenta</h3>
        <button type="button" id="eliminarCuenta">Eliminar</button>
    `;
    // ELIMINAR
    document.getElementById("eliminarCuenta").addEventListener("click",()=>{
        informacion.insertAdjacentHTML("afterend",`
            <div class="containerDatoExtra">
                <div class="containerEliminarInformacion">
                    <p>¿Estás seguro?</p>
                    <div class="containerEliminarInformacion_botones">
                        <button type="button" id="cancelarEliminar">Cancelar</button>
                        <button type="button" id="eliminarCuentaConfirmado">Eliminar</button>
                    </div>
                </div>
            </div>
        `);
        document.body.style.overflowY = "hidden";
        // CANCELAR
        document.getElementById("cancelarEliminar").addEventListener("click",()=>{
            document.querySelector(".main_container_total").removeChild(informacion.nextElementSibling);
            document.body.style.overflowY = "initial";
        });
        // ELIMINAR PERMANENTE
        document.getElementById("eliminarCuentaConfirmado").addEventListener("click",async ()=>{
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
            }).then(async function(texto){
                // console.log(texto)
                texto.forEach((valor,indice)=>{
                    if(valor.id === usuario.id){
                        texto.splice(indice,1);
                    }
                });
                // console.log(JSON.stringify(texto))
                // texto.splice(usuario,1);
                // console.log(texto);
                await fetch("../php/datos.php",{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json",
                        "tipo" : "deleteusuario"
                    },
                    body : JSON.stringify(texto)
                }).then(function(response){
                    if(response.ok){
                        return response.text();
                    }else{
                        throw "ERROR EN LA LLAMADA AJAX";
                    }
                }).then(function(respuesta){
                    // console.log(respuesta)
                    if(respuesta == "Eliminado"){
                        alert("Cuenta eliminada");
                        location.href = "index.html";
                        localStorage.removeItem("usuario");
                    }
                }).catch(function(err){
                    console.log(err);
                })
            }).catch(function(err){
                console.log(err);
            })
            // console.log(usuario);
            // alert("Eliminando la cuenta...");
            /* location.href = "index.html";
            localStorage.removeItem("usuario"); */
        });
    });
});

// BOTON DIRECCION
document.getElementById("misDirecciones").addEventListener("click", async()=>{
    await Usuario();
    let direcciones = [];
    let valor = 0;
    informacion.innerHTML = "";
    /* for(direccion in usuario.direcciones){
        valor++;
        informacion.insertAdjacentHTML("beforeend",`
            <h2>Direccion ${valor}</h2>
            <p>${usuario.direcciones[direccion]}</p>
        `);
        if(valor < Object.keys(usuario.direcciones).length){
            informacion.insertAdjacentHTML("beforeend",`
                <div class ="linea2"></div>
            `);
        }
    } */
    if(localStorage.getItem("direcciones") != null){
        direcciones = JSON.parse(localStorage.getItem("direcciones"));
    }else{
        if(Object.keys(usuario.direcciones).length == 1){
            informacion.innerHTML = "No hay direcciones";
        }else{
            for(direccion in usuario.direcciones){
                direcciones.push({
                    "direccion" : usuario.direcciones[direccion]
                });
            }
            localStorage.setItem("direcciones",JSON.stringify(direcciones));
        }
        
    }
    direcciones.forEach(direccion =>{
        valor++;
        informacion.insertAdjacentHTML("beforeend",`
            <h2>Direccion ${valor}</h2>
            <p>${direccion.direccion}</p>
        `);
        if(valor < Object.keys(direcciones).length){
            informacion.insertAdjacentHTML("beforeend",`
                <div class ="linea2"></div>
            `);
        }
    });
    informacion.insertAdjacentHTML("beforeend",`
        <button type="button" class="botonAddDireccion" id="addDireccion">Añadir direccion</button>
    `);
    // AÑADIR DIRECCIONES
    document.getElementById("addDireccion").addEventListener("click",()=>{
        informacion.insertAdjacentHTML("afterend",`
            <div class="containerDatoExtra">
                <div class="containerEliminarInformacion">
                    <h3>Nueva direccion</h3>
                    <input type="text" name="nuevaDireccion" id="nuevaDireccion">
                    <div class="containerEliminarInformacion_botones">
                        <button type="button" id="cancelarDireccion" class="botonAddDireccion">Volver</button>
                        <button type="button" id="addNuevaDireccion" class="botonAddDireccion">Añadir</button>
                    </div>
                </div>
            </div>
        `);
        document.body.style.overflowY = "hidden";
        // CANCELAR
        document.getElementById("cancelarDireccion").addEventListener("click",()=>{
            document.querySelector(".containerDatoExtra").remove();
            document.body.style.overflowY = "initial";
        });
        // AÑADIR DIRECCION
        document.getElementById("addNuevaDireccion").addEventListener("click",async ()=>{
            let nuevaDireccion = document.getElementById("nuevaDireccion");
            if(nuevaDireccion.value == ""){
                nuevaDireccion.style.border = "2px solid red";
            }else{
                console.log(direcciones)
                let coincidencia = direcciones.find(valor =>{
                    return valor.direccion == nuevaDireccion.value
                });
                if(coincidencia){
                    alert("Esa direccion ya esta registrada");
                    nuevaDireccion.style.border = "2px solid red";
                }else{
                    direcciones.push({"direccion" : nuevaDireccion.value});
                    nuevaDireccion.style.border = "2px solid var(--verde)";
                    alert("Direccion registrada");
                    localStorage.setItem("direcciones",JSON.stringify(direcciones));
                    location.reload();
                }
            }
        });
    });
})

// PETICION AL SERVIDOR DE TODOS LOS USUARIOS
async function Usuario(){
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
    })
}


// ACTUALIZAR
async function actualizarCuenta(){
    let nombre = document.getElementById("nombreAdministracion");
    let apellidos = document.getElementById("apellidosAdministracion");
    let correo = document.getElementById("correoAdministracion");
    let password1 = document.getElementById("passwordAdministracion");
    let password2 = document.getElementById("passwordAdministracion2");


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
        }).then(async function(texto){
            // console.log(texto)
            let actualizar = true;
            texto.forEach(valor =>{
                if(JSON.stringify(valor) === JSON.stringify(usuario)){
                    // console.log(valor)
                    if(nombre.value != ""){
                        valor.nombre = nombre.value;
                    }
                    if(apellidos.value != ""){
                        valor.apellidos = apellidos.value;
                    }
                    if(correo.value != ""){
                        valor.correo = correo.value;
                    }
                    if(password1.value != "" && password2.value != ""){
                        if(password2.value === password1.value){
                            if(validarPassword(password1.value)){
                                valor.password = password1.value;
                            }else{
                                password1.style.border = "2px solid var(--rojo-oscuro-claro)";
                                password2.style.border = "2px solid var(--rojo-oscuro-claro)";
                                actualizar = false;
                                alert("Las contraseñas no cumplen con los requisitos");
                            }
                        }else{
                            alert("Las contraseñas no coinciden");
                            password1.style.border = "2px solid red";
                            password2.style.border = "2px solid red";
                            actualizar = false;
                        }
                    }
                    if(nombre.value == "" && apellidos.value == "" && correo.value == "" && (password1.value == "" || password2.value == "")){
                        actualizar = false;
                    }
                }
            });
            if(actualizar){
                await fetch("../php/datos.php",{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json",
                        "tipo" : "usuarioModificar"
                    },
                    body : JSON.stringify(texto)
                }).then(function(response){
                    if(response.ok){
                        return response.text();
                    }else{
                        throw "ERROR EN LA LLAMADA AJAX";
                    }
                }).then(function(texto){
                    // console.log(texto)
                    if(texto == "Modificado"){
                        alert("La cuenta se ha actualizado");
                        location.reload();
                    }
                }).catch(function(err){
                    console.log(err);
                })
            }
        }).catch(function(err){
            console.log(err);
        })
    // console.log(usuario)
    
}



// BOTON MIS TARJETAS
let btnTarjeta = document.getElementById("misTarjetas");

btnTarjeta.addEventListener("click",()=>{
    let tarjeta;
    if(localStorage.getItem("tarjeta") != null){
        tarjeta = JSON.parse(localStorage.getItem("tarjeta"));
        document.querySelector(".main_container_derecha").innerHTML = "";
        document.querySelector(".main_container_derecha").insertAdjacentHTML("beforeend",`
            <div class="tarjeta">
                <p class="tipoTarjeta">Visa</p>
                <p class="nombreTarjeta">${tarjeta.nombreTitular}</p>
                <p class="fechaTarjeta">${tarjeta.fechaExpiracion}</p>
                <p class="numeroTarjeta">${tarjeta.numero}</p>
            </div>
        `);
    }else{
        document.querySelector(".main_container_derecha").innerHTML = `<h2>No tienes ninguna tarjeta guardada</h2>`;
    }
});

// MIS PEDIDOS
let btnPedidos = document.getElementById("misPedidos");

btnPedidos.addEventListener("click",()=>{
    let pedidos;
    if(localStorage.getItem("tarjeta") != null){
        pedidos = JSON.parse(localStorage.getItem("mispedidos"));
        document.querySelector(".main_container_derecha").innerHTML = "";
        pedidos.forEach(pedido =>{
            document.querySelector(".main_container_derecha").insertAdjacentHTML("beforeend",`
                <div class="pedidos">
                    <img src="${pedido.imagen}" class="imagenPedido">
                    <p class="nombrePedido">${pedido.nombre}</p>
                    <p class="fechaPedido">${pedido.cantidad}</p>
                    <p class="numeroPedido">${pedido.precio} €</p>
                </div>
            `);
        });
    }else{
        document.querySelector(".main_container_derecha").innerHTML = `<h2>No has realizado ningun pedido</h2>`;
    }
});