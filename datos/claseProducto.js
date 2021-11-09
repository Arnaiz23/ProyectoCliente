class Producto{
    constructor(imagen,nombre,marca,tipo,descripcionCorta,descripcion,precio){
        this.imagen = imagen;
        this.nombre = nombre;
        this.marca = marca;
        this.tipo = tipo;
        this.descripcionCorta = descripcionCorta;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    eliminarProducto(){

    }
    modificarNombre(nombre){
        this.nombre = nombre;
    }
}