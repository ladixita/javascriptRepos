//DOM
let productosDiv = document.getElementById("productos");
let guardarProductoBtn = document.getElementById("guardarProductoBtn");
let inputBuscador = document.querySelector("#buscador");
let coincidencia = document.getElementById("coincidenciaProd");
let selectOrden = document.getElementById("selectOrden");
let botonCarrito = document.getElementById("botonCarrito");
let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let precioTotal = document.getElementById("precioTotal");

let btnFinalizar = document.getElementById("botonFinalizarCompra");
let bodyProductosFinalizarCompra = document.getElementById("tbodyProductosFinalizarCompra");
let btngenerarOrdenCompra = document.getElementById("idbtngenerarOrdenCompra");
let montoTotalProductosFinalizarCompra = document.getElementById("idMontoTotalProductosFinalizarCompra");

var modalFinalizarCompra = new bootstrap.Modal(document.getElementById("idModalFinalizarCompra"),{})
var modalCarrito = new bootstrap.Modal(document.getElementById("idModalCarrito"),{}) 

//preguntando si hay productos en el carrito de compra
let productosEnCarrito
if (localStorage.getItem("carrito")) {
  productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
  productosEnCarrito = []
  localStorage.setItem("carrito", productosEnCarrito)
}

//funcion ver inventario en DOM
function verInventario(array) {
  //se limpia el div antes de imprimir la data final
  productosDiv.innerHTML = "";

  for (let producto of array) {
    //código para imprimir el array
    //creamos un div padre card
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
    agregarBtn.onclick = () => {
      agregarAlCarrito(producto)
    };
  }
}

//funcion para agregar un producto al carrito de compras
function agregarAlCarrito(producto) {
  console.log(`El producto ${producto.codigo} de nombre ${producto.nombre} ha sido agregado al carrito y vale ${producto.precio}`)
  //sumarlo a productosEnCarrito
  productosEnCarrito.push(producto)
  //setearlo en storage
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
  console.log(productosEnCarrito)
}

//funcion para cargar un producto
function cargarProducto(array) {
  let inputCodigo = document.getElementById("autorCodigo");
  let inputNombre = document.getElementById("nombreInput");
  let inputPrecio = document.getElementById("precioInput");

  //usar funcion constructora
  const nuevoProducto = new Producto(
    array.length + 1,
    inputNombre.value,
    parseInt(inputPrecio.value),
    inputCodigo.value,
    "productoNuevo.jpg"
  );

  //pushearlo o sumarlo al array
  array.push(nuevoProducto);

  //guardar en storage
  localStorage.setItem("inventario", JSON.stringify(array))

  verInventario(array);

  let formAgregarProducto = document.getElementById("formAgregarProducto")

  formAgregarProducto.reset()

  //alerta Toastify:
  Toastify({
    text: `El producto ${nuevoProducto.codigo} de nombre ${nuevoProducto.nombre} ha sido agregado al stock`,
    duration: 2500,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "black"
    }
  }).showToast()
}

//funcion para buscar un producto por nombre o codigo
function buscarInfo(buscado, array) {
  let busquedaArray = array.filter(
    (producto) => producto.nombre.toLowerCase().includes(buscado.toLowerCase()) || producto.codigo.toLowerCase().includes(buscado.toLowerCase())
  )

  //operador ternario para saber si hay coincidencias de busquedas
  busquedaArray.length == 0 ?
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, verInventario(busquedaArray))
    : (coincidencia.innerHTML = "", verInventario(busquedaArray))
}

function cargarProductosCarrito(array) {
  modalBodyCarrito.innerHTML = ""
  array.forEach((productoCarrito) => {

    modalBodyCarrito.innerHTML += `
      <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
          <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.codigo}">
          <div class="card-body">
                  <h4 class="card-title">${productoCarrito.nombre}</h4>
              
                  <p class="card-text">$${productoCarrito.precio}</p> 
                  <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
          </div>    
      </div>
      `
  })

  //funcion eliminar   
  array.forEach((productoCarrito) => {
    document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
      //borrar del DOM
      let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
      cardProducto.remove()
      //busco producto a eliminar
      let productoEliminar = array.find(producto => producto.id == productoCarrito.id)
      console.log(productoEliminar)
      //busqueda por indice
      let posicion = array.indexOf(productoEliminar)
      console.log(posicion)
      
      array.splice(posicion, 1)
      console.log(array)
      //eliminar storage
      localStorage.setItem("carrito", JSON.stringify(array))
      //recalcular el total
      compraTotal(array)
    })
  })
  compraTotal(array)
}

function agregarAlCarrito(producto) {
  console.log(producto)
  //evaluar si ya existe o no el producto
  let productoAgregado = productosEnCarrito.find((elem) => elem.id == producto.id)
  if (productoAgregado == undefined) {
    console.log(`El producto ${producto.codigo} de nombre ${producto.nombre} ha sido agregado al carrito y vale ${producto.precio}`)
    //sumarlo a productosEnCarrito
    productosEnCarrito.push(producto)
    //setearlo en storage
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

    //sweetalert cuando se agrega o se encuentra el producto en el carrito
    Swal.fire({
      title: 'Ha agregado un producto, gracias por llenar el inventario',
      text: `El producto ${producto.codigo} de nombre ${producto.nombre} ha sido agregado`,
      icon: "info",
      confirmButtonText: "Gracias",
      confirmButtonColor: "green",
      timer: 3000,
      imageUrl: `assets/${producto.imagen}`,
      imageHeight: 200
    })

  } else {
    //el producto ya se encuentra
    console.log(`El producto ${producto.codigo} de nombre ${producto.nombre} ya se encuentra en el carrito`)
    Swal.fire({
      text: `El producto ${producto.codigo} de nombre ${producto.nombre} ya existe en el carrito`,
      icon: "info",
      timer: 1500,
      showConfirmButton: false
    })
  }
}

//funcion de compra de un producto
function compraTotal(array){
  //acumulador con reduce
  let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio, 0)
  //ternario para mostrar en el html
  total == 0 ?
  precioTotal.innerHTML = `No hay productos agregados` :
  precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`
  return total
}

//funcion para ordenar de mayor a menor precio los productos
function ordenarMayorMenor(inventario) {
  const mayorMenor = [].concat(inventario);
  mayorMenor.sort((a, b) => b.precio - a.precio);
  verInventario(mayorMenor);
}

//funcion para odernar alfabeticamente los productos
function ordenarAlfabeticamenteNombre(array) {
  const ordenadoAlfabeticamente = [].concat(array);
  ordenadoAlfabeticamente.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    return 0;
  });
  verInventario(ordenadoAlfabeticamente);
}

//funcion para finalizar la compra
function finalizarCompra(){
  if(localStorage.getItem("carrito")){
    var carrito = JSON.parse(localStorage.getItem("carrito"));
    if(carrito.length == 0) return Swal.fire(
      'Ingrese al menos un producto?',
      '',
      'warning'
    );

    var renderBody = "";
    var total = 0;
    carrito.forEach((item,index) => {
      total += item.precio*item.cantidad;
      renderBody += "<tr>";
      renderBody += `<td>${index+1}</td>`;
      renderBody += `<td>${item.nombre}</td>`;
      renderBody += `<td>${item.codigo}</td>`;
      renderBody += `<td>${item.cantidad}</td>`;
      renderBody += `<td>${item.precio}</td>`;
      renderBody += "</tr>";
    })
    botonCarrito.click();
    bodyProductosFinalizarCompra.innerHTML = renderBody;
    montoTotalProductosFinalizarCompra.innerHTML = total;

    modalFinalizarCompra.show();
  }else{
    Swal.fire(
      'Ingrese al menos un producto?',
      '',
      'warning'
    )
  }
}

function generarOC(){
  var nombreCliInput = document.getElementById("nombreCliInput");
  var apellidoCliInput = document.getElementById("apellidoCliInput");
  var dniCliInput = document.getElementById("dniCliInput");
  var correoCliInput = document.getElementById("correoCliInput");
  if(nombreCliInput.value.trim().length > 0 && apellidoCliInput.value.trim().length  && dniCliInput.value.trim().length>5 && correoCliInput.value.trim().length > 0 ){
    modalFinalizarCompra.hide();
    localStorage.setItem("carrito","[]")
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Compra Realizada!',
      showConfirmButton: false,
      timer: 1500
    })
    
  }else{
    Swal.fire(
      'Datos incorrectos?',
      '',
      'warning'
    )
  }
  
}
guardarProductoBtn.addEventListener("click", () => {
  cargarProducto(inventario);
});

//por cada evento, averiguar su funcionamiento, luego pasarle function con instrucciones a realizar
inputBuscador.addEventListener("input", () => {
  buscarInfo(inputBuscador.value.toLowerCase(), inventario);
});

//select para ordenar
selectOrden.addEventListener("change", ()=>{
  if(selectOrden.value == "1"){
      ordenarMayorMenor(inventario);
  }else if(selectOrden.value =="2"){
    ordenarAlfabeticamenteNombre(inventario)
  }else{
      verInventario(inventario)
  }
})

botonCarrito.addEventListener("click", ()=>{
  cargarProductosCarrito(productosEnCarrito)
})

btnFinalizar.addEventListener('click', () => {
  finalizarCompra();
})
btngenerarOrdenCompra.addEventListener('click',()=>{
  generarOC();
})

verInventario(inventario)

const DateTime = luxon.DateTime
const fechaHoy = DateTime.now()
let fecha = document.getElementById("fecha")
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${fechaMostrar}`

