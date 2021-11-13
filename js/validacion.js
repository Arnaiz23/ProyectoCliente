// VALIDAR CORREO
function validarCorreo(correo){
    let correoValido = /^[a-zA-Z0-9]@{1}[a-z]\.{1}[a-z]$/;
    let correoValido2 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let correoValido3 = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if(correo.value == "" || correoValido2.test(correo.value)){
        return true;
    }else{
        return false;
    }
}