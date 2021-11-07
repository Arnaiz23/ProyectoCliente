// Recogida de datos
// let peticionUsuarios = fetch("../datos/usuarios.json");

let listaUsuario = [];

const getUsuario = async ()=>{
    let peticionUsuarios = fetch("../datos/usuarios.json");
    peticionUsuarios.then(res => res.json())
                    .then(res => valor = res)
                    .then(()=>{
                        valor.forEach(element => {
                            listaUsuario.push(element);
                        });
                        localStorage.setItem("listaUsuario",JSON.stringify(listaUsuario));
                    });
};

// -------------------------------------------------
