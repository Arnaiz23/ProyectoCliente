let marca = document.querySelector(".main_container_derecha_opciones_marca");



function insertarMarca(lista){
    let listaMarca = [];
    lista.forEach(texto =>{
        if(!listaMarca.includes(texto.marca)){
            listaMarca.push(texto.marca);
        }
    });
    listaMarca.forEach(texto => {
        marca.insertAdjacentHTML("beforeend",`
            <div class="opciones_filtro">
                <input type="checkbox" name="marca[]" id="${texto}">
                <label for="${texto}">${texto}</label>
            </div>
        `);
    })
}

function eliminarMarca(){
    let marcaAntigua = document.querySelectorAll(".main_container_derecha_opciones_marca .opciones_filtro");
    marcaAntigua.forEach((texto,indice)=>{
        marca.removeChild(marcaAntigua[indice]);
    });
}

function insertarTipo(lista){
    let listaTipo = [];
    let tipoAntiguo = document.querySelector(".main_container_derecha_opciones_tipos");
    lista.forEach(texto =>{
        if(!listaTipo.includes(texto.tipo)){
            listaTipo.push(texto.tipo);
        }
    });
    listaTipo.forEach(texto =>{
        tipoAntiguo.insertAdjacentHTML("beforeend",`
        <div class="opciones_filtro">
            <input type="checkbox" name="tipo[]" id="${texto}">
            <label for="camiseta">${texto}</label>
        </div>
        `);
    });
}

function eliminarTipo(){
    let tipoDatos = document.querySelectorAll(".main_container_derecha_opciones_tipos .opciones_filtro");
    let tipoAntiguo = document.querySelector(".main_container_derecha_opciones_tipos");
    tipoDatos.forEach((texto,indice)=>{
        tipoAntiguo.removeChild(tipoDatos[indice]);
    });
}