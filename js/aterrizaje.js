let marca = document.querySelector(".main_container_derecha_opciones_marca");



function insertarMarca(lista){
    let listaMarca = [];
    lista.forEach(texto =>{
        if(!listaMarca.includes(texto.marca)){
            listaMarca.push(texto.marca);
        }
    });
    console.log(listaMarca)
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