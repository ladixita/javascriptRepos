console.log("Bienvenidos, ingresaremos un inventario");

//clase producto
class Producto {
  constructor(id, nomProd, precProd, codInterno, imagen) {
    (this.id = id),
      (this.nombre = nomProd),
      (this.precio = precProd),
      (this.codigo = codInterno);
    this.imagen = imagen;
  }

  mostrarInfoProd() {
    console.log(
      `El producto ${this.nombre} tiene un precio de ${this.precio} y su código interno es ${this.codigo}`
    );
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
const inventario = [];
inventario.push(prod1, prod2, prod3, prod4, prod5, prod6);
console.log("inventario", inventario);

//funcion para ingresar producto
function ingresarProductos(arrayProd) {
  let nombreProducto = prompt("Ingrese el nombre del producto al inventario");
  let precioProducto = prompt("Ingrese el precio del producto");
  let codigoWeb = prompt("Ingrese el código web del producto");

  if (Number(precioProducto) >= 650) {
    precioProducto = Number(precioProducto * 0.95);
    alert(
      "El producto " +
        nombreProducto +
        " tendrá descuento del 5%, total será " +
        precioProducto
    );
  }

  const prodNuevo = new Producto(
    arrayProd.length + 1,
    nombreProducto,
    precioProducto,
    codigoWeb
  );
  console.log("Product", prodNuevo);
  arrayProd.push(prodNuevo);
  mostrarInventario(arrayProd);
}

//funcion para mostrar inventario
function mostrarInventario(arrayProd) {
  console.log("Los productos disponibles son:");
  for (let elemento of arrayProd) {
    console.log(elemento.id, elemento.nombre, elemento.precio, elemento.codigo);
  }
}

function mostrarInventarioForEach(inventario) {
  console.log("El inventario con forEach es");
  inventario.forEach((producto) => {
    console.log(
      `${producto.id} - el nombre del producto es: ${producto.nombre} que vale ${producto.precio} y cuyo código interno es ${producto.codigo}`
    );
  });
}

//funcion para buscar el producto por su nombre
function buscarPorNombre(inventario) {
  let productoBuscado = prompt(
    "Ingrese el nombre del producto que desea buscar"
  );
  let productoEncontrado = inventario.find(
    (prod) => prod.producto.toLowerCase() == productoBuscado.toLowerCase()
  );
  if (productoEncontrado == undefined) {
    console.log(`${productoBuscado} no se encuentra en el inventario`);
  } else {
    console.log(productoEncontrado);
  }
}

//funcion para ordenar de mayor a menor precio los productos
function ordenarMayorMenor(inventario) {
  const mayorMenor = [].concat(inventario);
  mayorMenor.sort((a, b) => b.precio - a.precio);
  mostrarInventario(mayorMenor);
}

//funcion para odernar alfabeticamente los productos
function ordenarAlfabeticamenteNombre(array) {
  const ordenadoAlfabeticamente = [].concat(array);
  //ordenar algo que tiene un dato string
  //forma de la a-z ascendente
  ordenadoAlfabeticamente.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    // a es igual b
    return 0;
  });
  mostrarInventario(ordenadoAlfabeticamente);
}

//ordenar un menu para decidir de qué manera quiere ordenar:
function ordenar(array) {
  let opcion = parseInt(
    prompt(`
    1 - Ordenar de mayor a menor precio:
    2 - Ordenar alfabeticamente por nombre del producto:`)
  );
  switch (opcion) {
    case 1:
      ordenarMayorMenor(array);
      break;
    case 2:
      ordenarAlfabeticamenteNombre(array);
      break;
    default:
      console.log(`${opcion} no es válido para ordenar`);
      break;
  }
}

//function borrar producto
function borrarProducto(array) {
  console.log(
    `A partir del inventario ingrese el id del producto que desea eliminar:`
  );
  for (let elem of array) {
    console.log(
      `${elem.id} - el producto con nombre ${elem.nombre} cuyo precio es ${elem.precio}`
    );
  }
  let idEliminar = parseInt(prompt("Ingrese el id a eliminar"));
  //map: copiar un array con sólo los indices
  let arrayID = array.map((producto) => producto.id);
  //indexOf para averiguar la posición del elemento que queremos
  let indice = arrayID.indexOf(idEliminar);
  //splice para una vez localizado el elemento, borrarlo

  array.splice(indice, 1);
  mostrarInventario(array);
}

function menu() {
  let salirMenu = false;
  do {
    salirMenu = preguntarOpcion(salirMenu);
  } while (!salirMenu);
}

function preguntarOpcion(salir) {
  let opcionIngresada = parseInt(
    prompt(`Ingrese la opción deseada
           1 - Agregar producto
           2 - Borrar producto
           3 - Consultar inventario
           4 - Encontrar por nombre de producto:
           5 - Ordenar productos:
           0 - Salir del menu`)
  );

  switch (opcionIngresada) {
    case 1:
      ingresarProductos(inventario);
      break;
    case 2:
      borrarProducto(inventario);
      break;
    case 3:
      mostrarInventario(inventario);
      break;
    case 4:
      buscarPorNombre(inventario);
      break;
    case 5:
      ordenar(inventario);
      break;
    case 0:
      console.log("gracias por utilizar nuestra app");
      salir = true;
      return salir;
      break;
    default:
      console.log("Ingrese una opción correcta");
      break;
  }
}

//trabajando con DOM
let productosDiv = document.getElementById("productos");
let verInventarioBtn = document.getElementById("verInventario");
let ocultarInventarioBtn = document.getElementById("ocultarInventario");
let guardarProductoBtn = document.getElementById("guardarProductoBtn");

//funcion ver inventario en DOM
function verInventario(array) {
  //antes que se vuelva a imprimir, resetear el div
  productosDiv.innerHTML = "";

  for (let producto of array) {
    //código para imprimir el array
    //creamos un div padre de la card
    let nuevoProductoDiv = document.createElement("div");
    nuevoProductoDiv.className = "col";
    nuevoProductoDiv.innerHTML = `
            <div id="${producto.id}" class="card h-100">
                <img class="card-img-top" style="max-height: 200px;" src="assets/${producto.imagen}" alt="${producto.nombre}">
                <div class="card-body">
                    <h4 class="card-title">${producto.nombre}</h4>
                    <p>Código: ${producto.codigo}</p>
                    <p>Precio: ${producto.precio}</p>
                    <button id="agregarBtn${producto.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
            </div>`;
    productosDiv.appendChild(nuevoProductoDiv);
    let agregarBtn = document.getElementById(`agregarBtn${producto.id}`);
    console.log(agregarBtn);
    agregarBtn.onclick = () => {
      console.log(producto);
      console.log(
        `El producto ${producto.codigo} de nombre ${producto.nombre} ha sido agregado al carrito y vale ${producto.precio}`
      );
    };
  }
}

verInventarioBtn.onclick = function () {
  verInventario(inventario);
};

ocultarInventarioBtn.addEventListener("dblclick", () => {
  productosDiv.innerHTML = "";
});

function cargarProducto(array) {
  let inputCodigo = document.getElementById("autorCodigo");
  let inputNombre = document.getElementById("nombreInput");
  let inputPrecio = document.getElementById("precioInput");

  //hacerlo con la function constructora
  const nuevoProducto = new Producto(
    array.length + 1,
    inputNombre.value,
    parseInt(inputPrecio.value),
    inputCodigo.value,
    "productoNuevo.jpg"
  );
  console.log(nuevoProducto);

  //pushearlo o sumarlo al array
  array.push(nuevoProducto);
  verInventario(array);
  inputCodigo.value = "";
  inputNombre.value = "";
  inputPrecio.value = "";
}

guardarProductoBtn.addEventListener("click", () => {
  cargarProducto(inventario);
});

let inputBuscador = document.querySelector("#buscador");
console.log(inputBuscador);
//por cada evento, averiguar su funcionamiento, luego pasarle function con instrucciones a realizar
inputBuscador.addEventListener("input", () => {
  console.log(inputBuscador.value);
});
