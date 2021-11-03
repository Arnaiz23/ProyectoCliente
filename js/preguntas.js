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