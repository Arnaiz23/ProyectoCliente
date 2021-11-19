/* let peticionf = fetch("../datos/futbol.json");
let peticionb = fetch("../datos/baloncesto.json");
let peticionv = fetch("../datos/voleibol.json");
let peticionr = fetch("../datos/running.json"); */

let listaf = [];
let listab = [];
let listav = [];
let listar = [];


const getInfo = async ()=>{
    let deportes = [];
    let peticionf = fetch("../datos/futbol.json");
    let peticionb = fetch("../datos/baloncesto.json");
    let peticionv = fetch("../datos/voleibol.json");
    let peticionr = fetch("../datos/running.json");

    deportes.push(await (await peticionf).json());
    deportes.push(await (await peticionb).json());
    deportes.push(await (await peticionv).json());
    deportes.push(await (await peticionr).json());
    
    return deportes;
}

/* const getInfo = async ()=>{
    peticionf.then(res => res.json())
    .then(res => valor = res)
    .then(()=>{
        valor.forEach(element => {
            // document.querySelector(".main_container_izquierda").innerHTML += element;    
            listaf.push(element)
        });
        pintarTabla(listaf);
        insertarMarca(listaf);
        insertarTipo(listaf);
        localStorage.setItem("lista",JSON.stringify(listaf));
        // document.querySelector(".main_container_izquierda").innerHTML = valor;
    });
    peticionb.then(res => res.json())
    .then(res => valor = res)
    .then(()=>{
        valor.forEach(element => {
            listab.push(element)
        });
    });
    peticionv.then(res => res.json())
    .then(res => valor = res)
    .then(()=>{
        valor.forEach(element => {
            listav.push(element)
        });
    });
    peticionr.then(res => res.json())
    .then(res => valor = res)
    .then(()=>{
        valor.forEach(element => {
            listar.push(element)
        });
    });
} */

async function Deporte(deporte){
    await fetch(`../php/datos.php`,{
        method : "POST",
        headers : {
            "Content-type" : "application/json",
            "tipo" : `${deporte}`
        }
    }).then(function(response){
        if(response.ok){
            return response.json();
        }else{
            throw "ERROR EN LA LLAMADA AJAX"
        }
    }).then(function(texto){
        // console.log(texto);
        borrarTarjetas();
        pintarTabla(texto);
        eliminarMarca();
        insertarMarca(texto);
        eliminarTipo();
        insertarTipo(texto);
        // localStorage.setItem("indice","0");
    }).catch(function(err){
        console.log(err);
    });
}

async function TodosDeportes(){
    await fetch(`../php/datos.php`,{
        method : "POST",
        headers : {
            "Content-type" : "application/json",
            "tipo" : "todos"
        }
    }).then(function(response){
        if(response.ok){
            return response.text();
        }else{
            throw "ERROR EN LA LLAMADA AJAX"
        }
    })
}
