//class producto
class Producto {
    constructor(id, nomProd, precProd, codInterno, imagen){
        this.id = id,
        this.nombre = nomProd,
        this.precio = precProd,
        this.codigo = codInterno, 
        this.imagen = imagen,
        this.cantidad = 1
        

    }
    //métodos
    mostrarInfoProducto(){
        console.log(`El producto ${this.nombre} tiene un precio de ${this.precio} y su código interno es ${this.codigo}`)
    }
    sumarUnidad(){
        this.cantidad += 1
    }
    restarUnidad(){
        this.cantidad += 1
    }
}

//Instación de objetos de productos
const prod1 = new Producto(
    1,
    "MP2 Micro Peristaltic Pump",
    2100,
    "MP2-1-PC",
    "MP2-4-PC-V1.jpg"
  );
  const prod2 = new Producto(
    2,
    "PVC 2-Stop Tubing",
    30,
    "MPP-027-PVC",
    "MPP-027-PVC.jpg"
  );
  const prod3 = new Producto(
    3,
    "Quartz Demountable Torch for Agilent ICPMS",
    385,
    "T89-Q",
    "T89-SilQ.jpg"
  );
  const prod4 = new Producto(
    4,
    "Platinum Shield Plate",
    210,
    "ES-3000-1661",
    "MC-65419.jpg"
  );
  const prod5 = new Producto(
    5,
    "Nickel Sampler Cone for PerkinElmer ICPMS",
    305,
    "MC-33612",
    "MC-33612-V2.jpg"
  );
  const prod6 = new Producto(
    6,
    "Aluminum Hyper Skimmer Cone for PerkinElmer ICPMS",
    142,
    "MC-33995",
    "MC-33995.jpg"
  );

//creación de inventario
let inventario = [];

//evaluando si hay algun producto en inventario
if(localStorage.getItem("inventario")){
    inventario = JSON.parse(localStorage.getItem("inventario"))
}else{
    //si no existe data
    console.log("Solo se setea por primera vez")
    inventario.push(prod1, prod2, prod3, prod4, prod5, prod6);
    localStorage.setItem("inventario", JSON.stringify(inventario))
}
