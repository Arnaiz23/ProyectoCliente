const btnCerrarSesion = document.querySelector(".header_nav_opciones_inicio");
const misPedidos = document.getElementById("misPedidos");
const administrarCuenta = document.getElementById("administrarCuenta");

function cerrarSesion(){
    localStorage.removeItem("usuario");
    location.href = "index.html";
}

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

// BOTON PEDIDOS
administrarCuenta.addEventListener("click",()=>{
    let listaUsuario = JSON.parse(localStorage.getItem("listaUsuario"))
    let usuario = listaUsuario.find(texto =>{
        return texto.usuario == localStorage.getItem("usuario");
    });
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
        <button type="button" id="actualizarCuenta">Actualizar</button>
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
        document.getElementById("eliminarCuentaConfirmado").addEventListener("click",()=>{
            alert("Eliminando la cuenta...");
            location.href = "index.html";
            localStorage.removeItem("usuario");
        });
    });
});

// BOTON DIRECCION
document.getElementById("misDirecciones").addEventListener("click",()=>{
    let listaUsuario = JSON.parse(localStorage.getItem("listaUsuario"))
    let usuario = listaUsuario.find(texto =>{
        return texto.usuario == localStorage.getItem("usuario");
    });
    let valor = 0;
    /* informacion.innerHTML = `
        <h2>Direccion1</h2>
        <p>${usuario.direcciones.direccion1}</p>
        <div class="linea"></div>
        <h2>Direccion2</h2>
        <p>${usuario.direcciones.direccion2}</p>
    `; */
    informacion.innerHTML = "";
    for(direccion in usuario.direcciones){
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
    }
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
    });
})