// VALIDAR CORREO
function validarCorreo(correo){
    let correoValido = /^[a-zA-Z0-9]+@{1}[a-z]+\.{1}[a-z]+$/;
    let correoValido2 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let correoValido3 = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if(correo.value == "" || correoValido.test(correo)){
        return true;
    }else{
        return false;
    }
}

// VALIDAR USUARIO
function validarUsuario(usuario){
    let usuariovalido = /^[a-zA-Z0-9]{4,}$/;
    if(usuario.value == "" || usuariovalido.test(usuario)){
        return true;
    }else{
        return false;
    }
}

// VALIDAR PASSWORD
function validarPassword(password){
    let passwordvalido = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(password.value == "" || passwordvalido.test(password)){
        return true;
    }else{
        return false;
    }
}
