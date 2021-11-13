// PRODUCTOS
document.getElementById("adminProductos").addEventListener("click",async ()=>{
    let texto = document.querySelector(".main_informacion_derecha h3");
    let container = document.querySelector(".main_informacion_derecha");
    container.removeChild(texto);
    eliminarPintado();
    container.insertAdjacentHTML("afterbegin",`
        <h3>Productos</h3>
        <table class="tabla" border="1">
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
        tabla = document.querySelector(".tabla");
        let indice = 0;
        listas.forEach(productos => {
            productos.forEach(producto => {
                tabla.insertAdjacentHTML("beforeend",`
                    <tr>
                        <td><img src="${producto.imagen}" class="adminProductoImagen" onclick="mostrarDatos()"></td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcionCorta}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio} €</td>
                    </tr>
                `);
                document.querySelectorAll(".adminProductoImagen")[indice].dato = producto;
                indice++;
            });
        });
    });
});

// CERRAR SESION
document.querySelector(".header_nav_opciones_inicio a").addEventListener("click",()=>{
    localStorage.removeItem("usuario");
    location.href = "index.html";
});

// PREGUNTAS
document.getElementById("adminPreguntas").addEventListener("click",async ()=>{
    let texto = document.querySelector(".main_informacion_derecha h3");
    let container = document.querySelector(".main_informacion_derecha");
    container.removeChild(texto);
    eliminarPintado();
    container.insertAdjacentHTML("afterbegin",`
        <h3>Preguntas</h3>
        <div class="preguntas">
        </div>
    `);
    let tabla = document.querySelector(".preguntas");
    // PREGUNTAS PEDIR
    await fetch("../php/datos.php",{
        method : "POST",
        headers : {
            "Content-type" : "application/json",
            "tipo" : "preguntas"
        }
    }).then(function(response){
        if(response.ok){
            return response.json();
        }else{
            throw "Error en la llamada AJAX";
        }
    }).then(function(texto){
        // console.log(texto)
        texto.forEach(valor => {
            tabla.insertAdjacentHTML("beforeend",`
                <div class="preguntaIndividual">
                    <div class="texto">
                        <h5>${valor.pregunta}</h5>
                        <p>${valor.respuesta}</p>
                    </div>
                    <span class="modificarPregunta icon-plus"></span>
                </div>
            `);
        });
    }).catch(function(err){
        console.log(err);
    });
});


function eliminarPintado(){
    let containerDelete = document.querySelector(".main_informacion_derecha div");
    let tablaDelete = document.querySelector(".main_informacion_derecha table")
    if(containerDelete != null){
        containerDelete.remove();
    }
    if(tablaDelete != null){
        tablaDelete.remove();
    }
}

function mostrarDatos(){
    document.body.style.overflowY = "hidden";
    document.querySelector(".main_informacion_derecha").insertAdjacentHTML("afterend",`
        <div class="fondo">
            <div class="containerDentro"></div>
        </div>
    `);
}