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
                        <td><img src="${producto.imagen}" class="adminProductoImagen" onclick="mostrarDatos(this)"></td>
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
        /* tabla.insertAdjacentHTML("afterend",`
            <h1>Actualizar</h1>
        `); */
    });
    if(document.getElementById("adminAdd") != null){
        document.getElementById("adminAdd").remove();
    }
    let container_izquierda = document.querySelector(".main_informacion_izquierda ul");
    container_izquierda.insertAdjacentHTML("beforeend",`
        <li id="adminAdd" onclick="addProducto()">Añadir</li>
    `);
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
        let indice = 0;
        texto.forEach(valor => {
            tabla.insertAdjacentHTML("beforeend",`
                <div class="preguntaIndividual">
                    <div class="texto">
                        <h5>${valor.pregunta}</h5>
                        <p>${valor.respuesta}</p>
                    </div>
                    <span class="modificarPregunta icon-plus" onclick="modificarPregunta(this)"></span>
                </div>
            `);
            document.querySelectorAll(".texto h5")[indice].dato = valor;
            indice++;
        });
        /* tabla.insertAdjacentHTML("afterend",`
            <h1>Hola</h1>
        `); */
    }).catch(function(err){
        console.log(err);
    });
    if(document.getElementById("adminAdd") != null){
        document.getElementById("adminAdd").remove();
    }
    let container_izquierda = document.querySelector(".main_informacion_izquierda ul");
    container_izquierda.insertAdjacentHTML("beforeend",`
        <li id="adminAdd" onclick="addPregunta()">Añadir</li>
    `);
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

function mostrarDatos(elemento){
    document.body.style.overflowY = "hidden";
    document.querySelector(".main_informacion_derecha").insertAdjacentHTML("afterend",`
        <div class="fondo">
            <div class="containerDentro">
                <label for="imagenProductoMod">Imagen</label>
                <input type="file" name="imagenProductoMod" id="imagenProductoMod">
                <label for="nombreProductoMod">Nombre</label>
                <input type="text" name="nombreProductoMod" id="nombreProductoMod" placeholder="${elemento.dato.nombre}">
                <label for="marcaProductoMod">Marca</label>
                <input type="text" name="marcaProductoMod" id="marcaProductoMod" placeholder="${elemento.dato.marca}">
                <label for="tipoProductoMod">Tipo</label>
                <input type="text" name="tipoProductoMod" id="tipoProductoMod" placeholder="${elemento.dato.tipo}">
                <label for="descripcionCortaMod">Descripcion corta</label>
                <textarea name="descripcionCortaMod" id="descripcionCortaMod" cols="30" rows="10" placeholder="${elemento.dato.descripcionCorta}"></textarea>
                <label for="descripcionLargaMod">Descripcion Larga</label>
                <textarea name="descripcionLargaMod" id="descripcionLargaMod" cols="30" rows="10" placeholder="${elemento.dato.descripcion}"></textarea>
                <label for="precioProductoMod">Precio</label>
                <input type="number" name="precioProductoMod" id="precioProductoMod" placeholder="${elemento.dato.precio}">
                <div>
                    <button type="button" class="boton" onclick="Cancelar()">Cancelar</button>
                    <button type="button" class="boton" onclick="ActualizarData()">Actualizar</button>
                </div>
            </div>
        </div>
    `);
}

function addProducto(){
    document.body.style.overflowY = "hidden";
    document.querySelector(".main_informacion_derecha").insertAdjacentHTML("afterend",`
        <div class="fondo">
            <div class="containerDentro">
                <label for="categoriaProductoAdd">Categoria</label>
                <select name="categoriaProductoAdd" id="categoriaProductoAdd">
                    <option value="futbol">Futbol</option>
                    <option value="baloncesto">Baloncesto</option>
                    <option value="voleibol">Voleibol</option>
                    <option value="running">Running</option>
                </select>   
                <div>
                    <button type="button" class="boton" onclick="Cancelar()">Cancelar</button>
                    <button type="button" class="boton" id="continuarAdd">Continuar</button>
                </div>
            </div>
        </div>
    `);
    let deporte = document.getElementsByName("categoriaProductoAdd")[0];
    document.getElementById("continuarAdd").addEventListener("click",()=>{
        Cancelar();
        document.body.style.overflowY = "hidden";
        document.querySelector(".main_informacion_derecha").insertAdjacentHTML("afterend",`
            <div class="fondo">
                <div class="containerDentro">
                    <label for="imagenProductoAdd">Imagen</label>
                    <input type="file" name="imagenProductoAdd" id="imagenProductoAdd">
                    <label for="nombreProductoAdd">Nombre</label>
                    <input type="text" name="nombreProductoAdd" id="nombreProductoAdd" placeholder="Escriba el nombre">
                    <label for="marcaProductoAdd">Marca</label>
                    <input type="text" name="marcaProductoAdd" id="marcaProductoAdd" placeholder="Escriba la marca">
                    <label for="tipoProductoAdd">Tipo</label>
                    <input type="text" name="tipoProductoAdd" id="tipoProductoAdd" placeholder="Escriba el tipo">
                    <label for="descripcionCortaAdd">Descripcion corta</label>
                    <textarea name="descripcionCortaAdd" id="descripcionCortaAdd" cols="30" rows="10" placeholder="Escriba una descripcion corta"></textarea>
                    <label for="descripcionLargaAdd">Descripcion Larga</label>
                    <textarea name="descripcionLargaAdd" id="descripcionLargaAdd" cols="30" rows="10" placeholder="Escriba una descripcion larga"></textarea>
                    <label for="precioProductoAdd">Precio</label>
                    <input type="number" name="precioProductoAdd" id="precioProductoAdd" placeholder="Escriba el precio">
                    <div>
                        <button type="button" class="boton" onclick="Cancelar()">Cancelar</button>
                        <button type="button" class="boton" id="addData">Añadir</button>
                    </div>
                </div>
            </div>
        `);
        let imagen = document.getElementById("imagenProductoAdd");
        let nombre = document.getElementById("nombreProductoAdd");
        let marca = document.getElementById("marcaProductoAdd");
        let tipo = document.getElementById("tipoProductoAdd");
        let corta = document.getElementById("descripcionCortaAdd");
        let larga = document.getElementById("descripcionLargaAdd");
        let precio = document.getElementById("precioProductoAdd");

        document.getElementById("addData").addEventListener("click",async ()=>{
            let coincidencia;
            await fetch("../php/datos.php",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json",
                    "tipo" : deporte.value
                }
            }).then(function(response){
                if(response.ok){
                    return response.json();
                }else{
                    throw "ERROR EN LA LLAMADA AJAX";
                }
            }).then(function(texto){
                // console.log(texto);
                coincidencia = texto.find(valor =>{
                    return valor.nombre == nombre.value
                });
            }).catch(function(err){
                console.log(err);
            });
            console.log(imagen.files[0].name)
            let nuevo = `
                    "imagen" : "../img/${imagen.files[0].name}",
                    "nombre" : "${nombre.value}",
                    "marca" : "${marca.value}",
                    "tipo" : "${tipo.value}",
                    "descripcionCorta" : "${corta.value}",
                    "descripcion" : "${larga.value}",
                    "precio" : "${precio.value}"
                `;
            if(coincidencia == undefined){
                // console.log(nuevo);
                // alert("añadir");
                await fetch("../php/datos.php",{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json",
                        "tipo" : deporte.value+"add"
                    },
                    body : JSON.stringify(nuevo)
                }).then(function(response){
                    if(response.ok){
                        return response.text();
                    }else{
                        throw "ERROR EN LA LLAMADA AJAX";
                    }
                }).then(function(texto){
                    console.log(texto);
                    alert("Añadiendo producto");
                    location.reload();
                }).catch(function(err){
                    console.log(err);
                });
            }else{
                alert("ya existe")
            }
        });
    });
}

function Cancelar(){
    document.body.style.overflowY = "initial";
    document.querySelector(".fondo").remove();
}

function modificarPregunta(pregunta){
    console.log(pregunta.previousElementSibling.firstElementChild.dato)
    document.querySelector(".main_informacion_derecha").insertAdjacentHTML("afterend",`
        <div class="fondo">
            <div class="containerDentro">
                <label for="preguntaMod">Pregunta</label>
                <input type="text" name="preguntaMod" id="preguntaMod" placeholder="${pregunta.previousElementSibling.firstElementChild.dato.pregunta}">
                <label for="respuestaMod">Respuesta</label>
                <textarea name="respuestaMod" id="respuestaMod" cols="30" rows="10" placeholder="${pregunta.previousElementSibling.firstElementChild.dato.respuesta}"></textarea>
                <div>
                    <button type="button" class="boton" onclick="Cancelar()">Cancelar</button>
                    <button type="button" class="boton" id="modPregunta">Modificar</button>
                </div>
            </div>
        </div>
    `);
}


function addPregunta(){
    document.querySelector(".main_informacion_derecha").insertAdjacentHTML("afterend",`
        <div class="fondo">
            <div class="containerDentro">
                <label for="preguntaAdd">Pregunta</label>
                <input type="text" name="preguntaAdd" id="preguntaAdd" placeholder="Escribe la pregunta">
                <label for="respuestaAdd">Respuesta</label>
                <textarea name="respuestaAdd" id="respuestaAdd" cols="30" rows="10" placeholder="Escribe la respuesta"></textarea>
                <div>
                    <button type="button" class="boton" onclick="Cancelar()">Cancelar</button>
                    <button type="button" class="boton" id="addPregunta">Añadir</button>
                </div>
            </div>
        </div>
    `);
    let pregunta = document.getElementById("preguntaAdd");
    let respuesta = document.getElementById("respuestaAdd");
    
    document.getElementById("addPregunta").addEventListener("click",async ()=>{
        let preguntanueva = `
            "pregunta" : "${pregunta.value}",
            "respuesta" : "${respuesta.value}"
        `;
        await fetch("../php/datos.php",{
            method : "POST",
            headers : {
                "Content-type" : "application/json",
                "tipo" : "preguntaadd"
            },
            body : JSON.stringify(preguntanueva)
        }).then(function(response){
            if(response.ok){
                return response.text();
            }else{
                throw "ERROR EN LA LLAMADA AJAX";
            }
        }).then(function(texto){
            // console.log(texto);
            if(texto == "OK"){
                alert("Pregunta añadida");
                location.reload();
            }
        }).catch(function(err){
            console.log(err);
        });
    });
}