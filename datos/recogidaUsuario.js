async function Usuario(){
    await fetch("../php/datos.php",{
        method : "POST",
        headers : {
            "Content-type" : "application/json",
            "tipo" : "usuarios"
        }
    }).then(function(response){
        if(response.ok){
            return response.json();
        }else{
            throw "ERROR EN LA LLAMADA AJAX";
        }
    }).then(function(texto){
        // console.log(texto)
        usuario = texto.find(texto =>{
            return texto.usuario == localStorage.getItem("usuario");
        });
    }).catch(function(err){
        console.log(err);
    })
}