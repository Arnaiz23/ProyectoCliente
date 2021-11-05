const contenedor_precio = document.querySelector(".main_container_derecha_carrito");

window.onload = ()=>{
    getInfo();
    // Sustituir el 0 por una variable del precio
    contenedor_precio.insertAdjacentHTML("beforeend",`
        <p>0 €</p>
    `);
}