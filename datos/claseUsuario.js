class claseUsuario{
    constructor(usuario,password,tipo,nombre,apellidos,correo,direccion){
        this.usuario = usuario;
        this.password = password;
        this.tipo = tipo;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.direccion = direccion;
    }
    modificarUsuario(nombre,apellidos,correo){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
    }
    cambiarPassword(password){
        this.password = password;
    }
}