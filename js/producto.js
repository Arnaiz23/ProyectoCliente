let imagen = document.querySelector(".main_container_izquierda img");
let nombre = document.querySelector(".main_container_derecha h2");
let marca = document.querySelectorAll(".tipos h3")[0];
let tipo = document.querySelectorAll(".tipos h3")[1];
let comentario = document.querySelector(".main_container_derecha p");
let precio = document.querySelectorAll(".precio h3")[1];

let objeto = JSON.parse(localStorage.getItem("producto"));

// PINTAR LOS DATOS DEL PRODUCTO SELECCIONADO
window.onload = async ()=>{
    imagen.src = objeto.imagen;
    nombre.innerHTML = objeto.nombre;
    marca.innerHTML = objeto.marca;
    tipo.innerHTML = objeto.tipo;
    comentario.innerHTML = objeto.descripcion;
    precio.innerHTML = objeto.precio+" €";
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
        // console.log(texto);
        let coincidencia = texto.find(elemento =>{
            return elemento.usuario == localStorage.getItem("usuario");
        });
        // USUARIO
        if(localStorage.getItem("usuario") != null){
            let boton_administracion = document.querySelector(".header_nav_opciones_inicio");
            
            if(coincidencia.tipo == "admin"){
                // if(localStorage.getItem("usuario") == texto.usuario){
                    boton_administracion.innerHTML = `
                    <a href="admin.html" id="administrar_sesion"><span class="icon-cog"></span>ADMIN</a>
                    `;
                // }
            }else{
                boton_administracion.innerHTML = `
                    <a href="administrar.html"><span class="icon-user"></span>MI CUENTA</a>
                `;
            }
        }
    });
}