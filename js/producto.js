let imagen = document.querySelector(".main_container_izquierda img");
let nombre = document.querySelector(".main_container_derecha h2");
let marca = document.querySelectorAll(".tipos h3")[0];
let tipo = document.querySelectorAll(".tipos h3")[1];
let comentario = document.querySelector(".main_container_derecha p");
let precio = document.querySelectorAll(".precio h3")[1];

let objeto = JSON.parse(localStorage.getItem("producto"));

window.onload = ()=>{
    imagen.src = objeto.imagen;
    nombre.innerHTML = objeto.nombre;
    marca.innerHTML = objeto.marca;
    tipo.innerHTML = objeto.tipo;
    comentario.innerHTML = objeto.descripcion;
    precio.innerHTML = objeto.precio+" €";
}