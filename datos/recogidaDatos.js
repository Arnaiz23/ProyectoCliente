let peticionf = fetch("../datos/futbol.json");
let peticionb = fetch("../datos/baloncesto.json");
let peticionv = fetch("../datos/voleibol.json");
let peticionr = fetch("../datos/running.json");

let listaf = [];
let listab = [];
let listav = [];
let listar = [];


const getInfo = async ()=>{
    peticionf.then(res => res.json())
    .then(res => valor = res)
    .then(()=>{
        valor.forEach(element => {
            // document.querySelector(".main_container_izquierda").innerHTML += element;    
            listaf.push(element)
        });
        pintarTabla(listaf);
        insertarMarca(listaf);
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
}

/* window.onload = ()=>{
    
} */


