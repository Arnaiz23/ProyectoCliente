const contenedor_precio = document.querySelector(".main_container_derecha_carrito");

window.onload = async ()=>{
    // SI LA PAGINA NO ES NI PREGUNTAS NI CARRITO
    if(!location.href.includes("preguntas.html") && !location.href.includes("carrito.html")){
        // PETICION Y PINTAMOS FUTBOL
        getInfo().then(deporte => {
            pintarTabla(deporte[0]);
            insertarMarca(deporte[0]);
            insertarTipo(deporte[0]);
            localStorage.setItem("indice","0");
        });
        // PETICION USUARIOS
        fetch("../php/datos.php",{
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
            if(localStorage.getItem("usuario") != null){
                if(localStorage.getItem("carrito") == null){
                    var valor = 0;
                }else{
                    valor = 0;
                    // carrito.forEach(producto => valor += parseFloat(producto.precio));
                    carrito.forEach(producto => {
                        valor += parseFloat(producto.precio) * parseInt(producto.cantidad);
                    });
                }
                // Sustituir el 0 por una variable del precio
                contenedor_precio.insertAdjacentHTML("beforeend",`
                    <p>${valor.toFixed(2)} ???</p>
                `);
            }else{
                contenedor_precio.innerHTML = "<p>Inicia sesi??n para acceder</p>";
            }
        }).catch(function(err){
            console.log(err);
        });
    }else{
        if(location.href.includes("carrito.html")){
            if(localStorage.getItem("carrito") == null){
                var valor = 0;
            }else{
                valor = 0;
                carrito.forEach(producto => {
                    valor += parseFloat(producto.precio) * parseInt(producto.cantidad);
                });
            }
            // Sustituir el 0 por una variable del precio
            contenedor_precio.insertAdjacentHTML("beforeend",`
                <p>${valor.toFixed(2)} ???</p>
            `);
            pintarCarrito();
        }
        fetch("../php/datos.php",{
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
            }else{
                if(location.href.includes("carrito.html")){
                    contenedor_precio.innerHTML = "<p>Inicia sesi??n para acceder</p>";
                }
            }
        }).catch(function(err){
            console.log(err);
        });
    }
}