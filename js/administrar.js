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
    // informacion.insertAdjacentHTML("afterbegin",`
    informacion.innerHTML = `
        <h3>Datos</h3>
        <p>Nombre</p>
        <input type="text" name="nombreAdministracion" id="nombreAdministracion" placeholder="${localStorage.getItem("usuario")}">
        <p>Apellidos</p>
        <input type="text" name="apellidosAdministracion" id="apellidosAdministracion">
        <p>Correo</p>
        <input type="text" name="correoAdministracion" id="correoAdministracion">
        <div class="linea"></div>
        <h3>Contraseña</h3>
        <p>Cambiar contraseña</p>
        <input type="password" name="passwordAdministracion" id="passwordAdministracion">
        <p>Confirmación</p>
        <input type="password" name="passwordAdministracion2" id="passwordAdministracion2">
        <div class="linea"></div>
        <h3>Eliminar cuenta</h3>
        <button type="button" id="eliminarCuenta">Eliminar</button>
    `;
    // ELIMINAR
    document.getElementById("eliminarCuenta").addEventListener("click",()=>{
        informacion.insertAdjacentHTML("afterend",`
            <div class="containerEliminar">
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