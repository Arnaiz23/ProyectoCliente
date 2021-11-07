const btnCerrarSesion = document.querySelector(".header_nav_opciones_inicio");

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