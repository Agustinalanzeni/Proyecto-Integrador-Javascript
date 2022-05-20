const botones = document.querySelectorAll(".botonCarrito")
const divCarrito = document.getElementById("carrito")
const mensajeCarritoVacio = document.getElementById("mensaje")
const formCategorias = document.getElementById("formCategorias")
const cafeGrano = document.getElementById("cafeGrano")
const cafeCaliente = document.getElementById("cafeCaliente")
const cafeFrio = document.getElementById("cafeFrio")

document.addEventListener("DOMContentLoaded", traerProductosLocalStorage)

botones.forEach((añadirAlCarrito)=> {
    añadirAlCarrito.addEventListener("click", añadirAlCarritoClick)
})

function añadirAlCarritoClick (event) {
    const boton = event.target
    const parent = boton.parentElement
    const producto = {
        nombre : parent.querySelector(".nombreProducto").textContent,
        precio : parent.querySelector(".precio").textContent,
        imagen : parent.querySelector(".imagenProducto").src,
        cantidad : 1
    }    
    agregarItemAlCarrito(producto)
}

function agregarItemAlCarrito (producto) {
    mensajeCarritoVacio.classList.add("hidden")
    const contenedorItem = document.createElement("div")
    contenedorItem.classList.add("contenedorItem")
    contenedorItem.innerHTML = `
        <img src="${producto.imagen}" alt="">
        <div class="datosItem">
            <p class="nombreProductoCarrito">${producto.nombre}</p>
            <div class="cajaItem">
                <p><span class="cantidadItem">${producto.cantidad}</span>x</p>
                <p class="precioItem">${producto.precio}</p>
                <button class="borrarProducto fas fa-trash" id="borrarProducto"></button>
            </div>
        </div>
    `
    divCarrito.appendChild(contenedorItem)

    const botonEliminar = contenedorItem.querySelector(".borrarProducto")
    botonEliminar.addEventListener("click", borrarProducto)

    actualizarTotal()
    // actualizarCantidad()
    guardarProductoLocalStorage(producto)
}

function borrarProducto (e) {
    e.preventDefault()
    e.target.parentElement.parentElement.parentElement.remove()
    const productoEliminado = e.target.parentElement.parentElement.parentElement
    const nombreProductoEliminadoElemento = productoEliminado.querySelector(".nombreProductoCarrito")
    const nombreProductoEliminado = nombreProductoEliminadoElemento.textContent
    actualizarTotal()
    eliminarProductoLocalStorage(nombreProductoEliminado)
}

function actualizarTotal () {
    let total = 0
    const subtotal = document.querySelector(".subtotal")
    const productosCarrito = document.querySelectorAll(".contenedorItem")
    
    productosCarrito.forEach(productoCarrito => {
        const precioProductoCarritoElemento = productoCarrito.querySelector(".precioItem")
        const precioProductoCarrito = Number(precioProductoCarritoElemento.textContent.replace("$", ""))
        
        const cantidadProductoCarritoElemento = productoCarrito.querySelector(".cantidadItem")
        const cantidadProductoCarrito = Number(cantidadProductoCarritoElemento.textContent)
        
        total = total + (precioProductoCarrito * cantidadProductoCarrito)
    })
    subtotal.innerHTML = `${total}`
}

function guardarProductoLocalStorage(producto) {
    let productos
    productos = this.obtenerProductosLocalStorage()
    productos.push(producto)
    localStorage.setItem("productos", JSON.stringify(productos))
}

function obtenerProductosLocalStorage () {
    let productosLS

    if(localStorage.getItem("productos") === null){
        productosLS = []
    } else {
        productosLS = JSON.parse(localStorage.getItem("productos"))
    }
    return productosLS
}

function eliminarProductoLocalStorage(nombre) {
    let productosLS
    productosLS = this.obtenerProductosLocalStorage()

    productosLS.forEach(function(productoLS, index){
        if (productoLS.nombre === nombre) {
            productosLS.splice(index, 1)
        }
    })
    localStorage.setItem("productos", JSON.stringify(productosLS))
}

function traerProductosLocalStorage() {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function(producto) {
        mensajeCarritoVacio.classList.add("hidden")
        const contenedorItem = document.createElement("div")
        contenedorItem.classList.add("contenedorItem")
        contenedorItem.innerHTML = `
            <img src="${producto.imagen}" alt="">
            <div class="datosItem">
                <p class="nombreProductoCarrito">${producto.nombre}</p>
                <div class="cajaItem">
                    <p><span class="cantidadItem">${producto.cantidad}</span>x</p>
                    <p class="precioItem">${producto.precio}</p>
                    <button class="borrarProducto fas fa-trash" id="borrarProducto"></button>
                </div>
            </div>
        `
        divCarrito.appendChild(contenedorItem)
        const botonEliminar = contenedorItem.querySelector(".borrarProducto")
        botonEliminar.addEventListener("click", borrarProducto)
    })
}

formCategorias.addEventListener("change", filtrarProductos)

function filtrarProductos () {
    const input = formCategorias.categoria
    const inputValue = input.value
    cafeGrano.classList.remove("eliminarCategoria")
    cafeCaliente.classList.remove("eliminarCategoria")
    cafeFrio.classList.remove("eliminarCategoria")
    
    if (inputValue === "1") {
        cafeFrio.classList.add("eliminarCategoria")
        cafeCaliente.classList.add("eliminarCategoria")
    } else if (inputValue === "2") {
        cafeGrano.classList.add("eliminarCategoria")
        cafeFrio.classList.add("eliminarCategoria")
    } else {
        cafeGrano.classList.add("eliminarCategoria")
        cafeCaliente.classList.add("eliminarCategoria")
    }

}









