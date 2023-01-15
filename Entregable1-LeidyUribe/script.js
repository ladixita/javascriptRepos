function pedirNombre() {
    let nombre = prompt("Ingrese su nombre")
    return nombre
}

function pedirCantProductos(nom) {
    let cantidadProductos = parseInt(prompt(nom + " ingrese cantidad de productos a registrar"))
    while(isNaN(cantidadProductos)) {
        cantidadProductos = parseInt(prompt("Ingreso cantidad inválida, favor de ingresar cantidad válida"))
    }
    return cantidadProductos
}

function ingresarProductos(cantProd) {
    for (let index = 1; index <= cantProd; index++) {
        // const element = array[index];
        let nombreProducto = prompt("Ingrese el nombre del producto al inventario")
        let precioProducto = prompt("Ingrese el precio del producto")
        if(Number(precioProducto) >= 650) {
            precioProducto = Number(precioProducto*0.95)
            alert("El producto " + nombreProducto + " tendrá descuento del 5%, total será " + precioProducto)
        }
        const prodNuevo = new Producto(index, nombreProducto, precioProducto)
        prodNuevo.mostrarInfoProd()
    }
}

class Producto {
    constructor(id, nomProd, precProd) {
        this.id = id,
        this.nombre = nomProd,
        this.precio = precProd
    }
    mostrarInfoProd(){
        console.log(`El producto ${this.nombre} tiene un precio de ${this.precio} y su código interno es ${this.id}`)
    }
}

let respuesta
function escape() {
    respuesta = prompt("Desea continuar ingresando productos?. ESC para salir")
}

do {
    const nombre = pedirNombre()
    const cantidadProd = pedirCantProductos(nombre)
    ingresarProductos(cantidadProd)
    escape()
} while (respuesta.toUpperCase() != "ESC");