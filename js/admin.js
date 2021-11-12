document.getElementById("adminProductos").addEventListener("click",async ()=>{
    let tabla = document.querySelector(".tabla");
    await getInfo().then(listas =>{
        listas.forEach(productos => {
            productos.forEach(producto => {
                tabla.insertAdjacentHTML("afterbegin",`
                    <tr>
                        <td><img src="${producto.imagen}" style="width:20%"></td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcionCorta}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                    </tr>
                `); 
            });
        });
    });
});