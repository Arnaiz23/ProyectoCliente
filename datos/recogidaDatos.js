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



