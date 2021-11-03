// CONFIGURACION DEL BOTON MENU
const boton_menu = document.querySelector("#botonMenu");
const menu = document.querySelector("nav");

boton_menu.addEventListener("click",()=>{
    menu.classList.toggle("ver");
});