document.getElementById("adminProductos").addEventListener("click",async ()=>{
    let texto = document.querySelector(".main_informacion_derecha h3");
    let container = document.querySelector(".main_informacion_derecha");
    container.removeChild(texto);
    container.insertAdjacentHTML("afterbegin",`
        <h3>Productos</h3>
        <table class="tabla">
        </table>
    `);
    let tabla = document.querySelector(".tabla");
    await getInfo().then(listas =>{
        tabla.insertAdjacentHTML("afterbegin",`
                <tr>
                    <td>Imagen</td>
                    <td>Nombre</td>
                    <td>Breve descripcion</td>
                    <td>Descripcion larga</td>
                    <td>Precio</td>
                </tr>
        `);
        tabla = document.querySelector(".tabla tr");
        listas.forEach(productos => {
            productos.forEach(producto => {
                tabla.insertAdjacentHTML("afterend",`
                    <tr>
                        <td><img src="${producto.imagen}" style="width:20%"></td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcionCorta}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio} €</td>
                    </tr>
                `); 
            });
        });
    });
});