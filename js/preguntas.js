window.onload = async()=>{
    // USUARIO ACTIVO
    getUsuario().then(valor=>{
        let coincidencia = valor.find(elemento =>{
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
    });
    // PREGUNTAS PINTAR
    let container = document.querySelector(".main_container_izquierda");
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
            container.insertAdjacentHTML("beforeend",`
                <div class="main_container_izquierda_pregunta">
                    <h3 class="pregunta_tipica">${valor.pregunta}</h3>
                    <span class="icon-circle-down"></span>
                </div>
                <div class="main_container_izquierda_respuesta">
                    <p>${valor.respuesta}</p>
                </div>
            `);
        });
    }).catch(function(err){
        console.log(err);
    });
    let boton_pregunta = document.querySelectorAll(".main_container_izquierda_pregunta");
    let texto = document.querySelectorAll(".main_container_izquierda_respuesta");
    for(let i=0; i<=boton_pregunta.length-1; i++){
        boton_pregunta[i].addEventListener("click",()=>{
            texto[i].classList.toggle("ver_respuesta");
            if(boton_pregunta[i].lastElementChild.classList.contains("icon-circle-down")){
                boton_pregunta[i].lastElementChild.classList.replace("icon-circle-down","icon-circle-up");
            }else{
                boton_pregunta[i].lastElementChild.classList.replace("icon-circle-up","icon-circle-down");
            }
        });
    }
}