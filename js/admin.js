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
    // PINTAMOS LA TABLA CON TODOS LOS PRODUCTOS
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
    });
    // BOTON AÑADIR PRODUCTO
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
    }).catch(function(err){
        console.log(err);
    });
    // BOTON AÑADIR PREGUNTAS
    if(document.getElementById("adminAdd") != null){
        document.getElementById("adminAdd").remove();
    }
    let container_izquierda = document.querySelector(".main_informacion_izquierda ul");
    container_izquierda.insertAdjacentHTML("beforeend",`
        <li id="adminAdd" onclick="addPregunta()">Añadir</li>
    `);
});

// FUNCION PARA ELIMINAR TANTO LA TABLA DE PRODUCTOS COMO LA DE PREGUNTAS
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

// FUNCION PARA MOSTRAR LOS DATOS DE UN PRODUCTO
function mostrarDatos(elemento){
    document.body.style.overflowY = "hidden";
    document.querySelector(".main_informacion_derecha").insertAdjacentHTML("afterend",`
        <div class="fondo">
            <div class="containerDentro">
                <label for="imagenProductoMod">Imagen</label>
                <input type="file" name="imagenProductoMod" id="imagenProductoMod">
                <label for="nombreProductoMod">Nombre</label>
                <input type="text" name="nombreProductoMod" id="nombreProductoMod" placeholder="${elemento.dato.nombre}">
                <label for="descripcionCortaMod">Descripcion corta</label>
                <textarea name="descripcionCortaMod" id="descripcionCortaMod" cols="30" rows="10" placeholder="${elemento.dato.descripcionCorta}"></textarea>
                <label for="descripcionLargaMod">Descripcion Larga</label>
                <textarea name="descripcionLargaMod" id="descripcionLargaMod" cols="30" rows="10" placeholder="${elemento.dato.descripcion}"></textarea>
                <label for="precioProductoMod">Precio</label>
                <input type="number" name="precioProductoMod" id="precioProductoMod" placeholder="${elemento.dato.precio}">
                <div>
                    <button type="button" class="boton" onclick="Cancelar()">Cancelar</button>
                    <button type="button" class="boton" onclick="ActualizarData()">Actualizar</button>
                    <button type="button" class="boton" onclick="EliminarProducto()">Eliminar</button>
                </div>
            </div>
        </div>
    `);
    document.querySelectorAll(".containerDentro div button")[1].producto = elemento.dato;
    document.querySelectorAll(".containerDentro div button")[2].producto = elemento.dato;
}

// FUNCION PARA AÑADIR UN PRODUCTO NUEVO
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

        // PROCESO FINAL PARA AÑADIR. ENVIAR DATOS AL SERVIDOS
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
            // console.log(imagen.files[0].name)
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

// FUNCION PARA CANCELAR LA ACCION
function Cancelar(){
    document.body.style.overflowY = "initial";
    document.querySelector(".fondo").remove();
}

// FUNCION PARA MODIFICAR LAS PREGUNTAS
function modificarPregunta(pregunta){
    // console.log(pregunta.previousElementSibling.firstElementChild.dato)
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
                    <button type="button" class="boton" onclick="EliminarPregunta()">Eliminar</button>
                </div>
            </div>
        </div>
    `);
    document.querySelectorAll("button")[2].pregunta = pregunta.previousElementSibling.firstElementChild.dato;
    document.body.style.overflowY = "hidden";
}

// FUNCION PARA AÑADIR UNA PREGUNTA
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
    
    // ENVIAR DATOS DE LA NUEVA PREGUNTA AL SERVIDOR
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

// FUNCION ELIMINAR UNA PREGUNTA
async function EliminarPregunta(){
    // console.log(this.event.target.pregunta)
    pregunta = this.event.target.pregunta;
    // SOLICITAR TODAS LAS PREGUNTAS AL SERVIDOR
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
    }).then(async function(texto){
        texto.forEach((valor,indice) =>{
            if(valor.pregunta == pregunta.pregunta){
                texto.splice(indice,1);
            }
        });
        // ENVIAR LOS DATOS AL SERVIDOR
        await fetch("../php/datos.php",{
            method : "POST",
            headers : {
                "Content-type" : "application/json",
                "tipo" : "deletepregunta"
            },
            body : JSON.stringify(texto)
        }).then(function(response){
            if(response.ok){
                return response.text();
            }else{
                throw "Error en la llamada AJAX";
            }
        }).then(function(texto){
            // console.log(texto)
            if(texto == "Eliminado"){
                alert("Pregunta eliminada");
                location.reload();
            }
        }).catch(function(err){
            console.log(err);
        });  
    }).catch(function(err){
        console.log(err);
    });   
}

// FUNCION ELIMINAR UN PRODUCTO
async function EliminarProducto(){
    let producto = this.event.target.producto;
    await getInfo().then(listas =>{
        listas.forEach(productos => {
            productos.forEach(async (elemento,indice) => {
                if(producto.nombre == elemento.nombre){
                    let deporte = elemento.deporte;
                    productos.splice(indice,1);
                    await fetch("../php/datos.php",{
                        method : "POST",
                        headers : {
                            "Content-type" : "application/json",
                            "tipo" : `delete${deporte}`
                        },
                        body : JSON.stringify(productos)
                    }).then(function(response){
                        if(response.ok){
                            return response.text();
                        }else{
                            throw "Error en la llamada AJAX";
                        }
                    }).then(function(texto){
                        // console.log(texto)
                        if(texto == "Eliminado"){
                            alert("Pregunta eliminada");
                            location.reload();
                        }
                    }).catch(function(err){
                        console.log(err);
                    });  
                }
            });
        });
    });
}

// FUNCION ACTUALIZAR PRODUCTO
async function ActualizarData(){
    let producto = this.event.target.producto;
    let imagen = document.getElementById("imagenProductoMod");
    let nombre = document.getElementById("nombreProductoMod");
    let corta = document.getElementById("descripcionCortaMod");
    let larga = document.getElementById("descripcionLargaMod");
    let precio = document.getElementById("precioProductoMod");
    await getInfo().then(listas =>{
        listas.forEach(productos => {
            productos.forEach(async (elemento,indice) => {
                if(producto.nombre == elemento.nombre){
                    let deporte = elemento.deporte;
                    // ---------------------------------
                    if(nombre.value != ""){
                        elemento.nombre = nombre.value;
                    }
                    if(corta.value != ""){
                        elemento.descripcionCorta = corta.value;
                    }
                    if(larga.value != ""){
                        elemento.descripcion = larga.value;
                    }
                    if(precio.value != ""){
                        elemento.precio = precio.value;
                    }
                    if(imagen.value != ""){
                        elemento.imagen = `../img/${imagen.files[0].name}`
                    }
                    // ---------------------------------
                    await fetch("../php/datos.php",{
                        method : "POST",
                        headers : {
                            "Content-type" : "application/json",
                            "tipo" : `modificar${deporte}`
                        },
                        body : JSON.stringify(productos)
                    }).then(function(response){
                        if(response.ok){
                            return response.text();
                        }else{
                            throw "Error en la llamada AJAX";
                        }
                    }).then(function(texto){
                        // console.log(texto)
                        if(texto == "Modificado"){
                            alert("Producto modificado");
                            location.reload();
                        }
                    }).catch(function(err){
                        console.log(err);
                    });  
                }
            });
        });
    });
}