// Recogida de datos
// let peticionUsuarios = fetch("../datos/usuarios.json");

// let listaUsuario = [];

const getUsuario = async ()=>{
    let peticionUsuarios = fetch("../datos/usuarios.json");
    let datos = await (await peticionUsuarios).json();
    return datos;
};

// -------------------------------------------------
