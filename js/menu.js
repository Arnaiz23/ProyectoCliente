// CONFIGURACION DEL BOTON MENU
const boton_menu = document.querySelector("#botonMenu");
const menu = document.querySelector("nav");

boton_menu.addEventListener("click",()=>{
    menu.classList.toggle("ver");
});

// Pulsar en cualquier lado y que se quite
window.addEventListener("click",(e)=>{
    if(e.target != menu && menu.classList.contains("ver") && e.target != boton_menu){
        menu.classList.toggle("ver");
    }
});
