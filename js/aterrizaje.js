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

function ordenarMenor(lista){
    borrarTarjetas();
    pintarTabla(lista.sort((a,b) => {
        return parseInt(a.precio) - parseInt(b.precio);
        // console.log(a.precio +" y "+ b.precio)
    }));
}

function ordenarMayor(lista){
    borrarTarjetas();
    pintarTabla(lista.sort((a,b) => {
        return parseInt(b.precio) - parseInt(a.precio);
        // console.log(a.precio +" y "+ b.precio)
    }));
}


// FILTRO
document.getElementById("filtroMenor").addEventListener("click",()=>{
    let lista = localStorage.getItem("lista");
    let lista2 = JSON.parse(lista);
    ordenarMenor(lista2);
});

document.getElementById("filtroMayor").addEventListener("click",()=>{
    let lista = localStorage.getItem("lista");
    let lista2 = JSON.parse(lista);
    ordenarMayor(lista2);
});

document.getElementById("filtroNormal").addEventListener("click",()=>{
    let lista = localStorage.getItem("lista");
    let lista2 = JSON.parse(lista);
    borrarTarjetas();
    pintarTabla(lista2);
});

function regresarFiltro(){
    document.getElementsByName("filtro")[0].selectedIndex = 0;
}

// BUSCAR
let buscar = document.getElementById("buscar");

function filtroBuscar(lista){
    let filtrada = [];
    
    lista.filter(elemento => {
        for(let clave in elemento){
            if(elemento[clave].includes(buscar.value)){
                if(!filtrada.includes(elemento)){
                    filtrada.push(elemento);
                }
            }
        }
    });
    // console.log(filtrada)
    // let filtrada = lista.filter(elemento => elemento.nombre.includes(buscar.value));
    borrarTarjetas();
    pintarTabla(filtrada);
}

const botonBuscar = document.getElementById("buscar_filtro");

botonBuscar.addEventListener("click",()=>{
    let indice = localStorage.getItem("indice");
    getInfo().then(deporte => {
        filtroBuscar(deporte[indice]);
    });
})