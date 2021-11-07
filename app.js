/* Usuario */
cerrarSesion.style.visibility = "hidden"

class Usuario {
    constructor(nombre, clave) {
        this.nombre = nombre
        this.clave = clave
    }
}


const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []


const crearUsuario = () => {
    let nombre = inputUsuario.value;
    let clave = inputClave.value;

    if ( inputClave.value.length > 8) {
        validaciones.innerHTML = "Usuario registrado con éxito"
        validaciones.style.color = "green"

        const usuario = new Usuario(nombre, clave)

        usuarios.push(usuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        inputUsuario.value = "";
        inputClave.value = "";
        btnIngresar.style.display = "block"
        btnRegistrate.style.display = "none"
        linkRegistro.style.display = "block"

    } else {
        validaciones.innerHTML = "El usuario o clave no cumple con los requisitos solicitados"
        validaciones.style.color = "red"
    }
}

const mostrarRegistro = () => {

    btnIngresar.style.display = "none"
    btnRegistrate.style.display = "block"
    linkRegistro.style.display = "none"

}



const login = (nombreUsuario, claveUsuario) => {
    if (localStorage.getItem("usuariologueado")) {
        nombreUsuario = JSON.parse(localStorage.getItem("usuariologueado")).nombre
        claveUsuario = JSON.parse(localStorage.getItem("usuariologueado")).clave
    }

    const chequeoUsuario = usuarios.find(e => e.nombre === nombreUsuario)

    if (chequeoUsuario) {

        validaciones.innerHTML = ""

        if (claveUsuario === chequeoUsuario.clave) {
            localStorage.setItem("usuariologueado", JSON.stringify(chequeoUsuario))
            chequeoSesion()
            location.href = "index.html"
        } else {
            validaciones.innerHTML = "La clave ingresada es incorrecta"
            validaciones.style.color = "red"
        }
    } else {
        validaciones.innerHTML = "El usuario no esta registrado"
        validaciones.style.color = "red"
    }
}

const chequeoSesion = () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuariologueado"))
    if (usuarioLogueado === null) {
        cerrarSesion.style.visibility = "hidden"
        usuarioNav.innerHTML = ``
        formLogin.style.display = "block"
    } else {
        cerrarSesion.style.visibility = "visible"
        usuarioNav.innerHTML = `${usuarioLogueado.nombre}`
        formLogin.style.display = "none"
    }
}
chequeoSesion()




const cerrarSesionFunc = () => {

    localStorage.removeItem("usuariologueado")
    chequeoSesion()
}



cerrarSesion.onclick = () => {
    cerrarSesionFunc()
}



/* Carrito */

const carritoDeCompras = JSON.parse(localStorage.getItem("carrito_")) || []

const contenedorCarrito = document.getElementById(`Carrito-Contenedor`)

const contadorCarrito = document.getElementById(`ContadorCarrito`)
const precioTotal = document.getElementById(`precioTotal`)

let MostrarCarrito = $("#CarritoManual")

$("#BtnCarrito").click(() => {
    MostrarCarrito.slideToggle()
})


function agregarJogginCarrito(id) {
    let jogginAgregado = stockJoggins.filter((el) => el.id == id)[0]
    checkId(jogginAgregado)
    actualizarCarrito(carritoDeCompras)


    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
          <p>${jogginAgregado.tipo} "${jogginAgregado.nombre}"</p>
          <p>Precio: ${jogginAgregado.precio}</p>
          <button id="eliminar${jogginAgregado.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
      `
    contenedorCarrito.appendChild(div)
    let botonEliminar = document.getElementById(`eliminar${jogginAgregado.id}`)

    botonEliminar.addEventListener('click', () => {
        botonEliminar.parentElement.remove()
        eliminarProductoCarrito(jogginAgregado)
        actualizarCarrito(carritoDeCompras)
    })
}

function agregarRemeraCarrito(id) {
    let remeraAgregada = stockRemeras.filter((el) => el.id == id)[0]
    checkId(remeraAgregada)
    actualizarCarrito(carritoDeCompras)


    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
          <p>${remeraAgregada.tipo} "${remeraAgregada.nombre}"</p>
          <p>Precio: $${remeraAgregada.precio}</p>
          <button id="eliminar${remeraAgregada.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
      `
    contenedorCarrito.appendChild(div)
    let botonEliminar = document.getElementById(`eliminar${remeraAgregada.id}`)

    botonEliminar.addEventListener('click', () => {
        botonEliminar.parentElement.remove()
        eliminarProductoCarrito(remeraAgregada)
        actualizarCarrito(carritoDeCompras)
    })
}
const carritoLocal = JSON.parse(localStorage.getItem("carrito_")) || []

const CompraRealizada = JSON.parse(localStorage.getItem("CompraRealizada")) || []

function agregarBuzoCarrito(id) {
    let buzoAgregado = stockBuzos.filter((el) => el.id == id)[0]
    checkId(buzoAgregado)
    actualizarCarrito(carritoDeCompras)

    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
        <p>${buzoAgregado.tipo} ""${buzoAgregado.nombre}"</p>
        <p>Precio: $${buzoAgregado.precio}</p>
        <button id="eliminar${buzoAgregado.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
    contenedorCarrito.appendChild(div)
    let botonEliminar = document.getElementById(`eliminar${buzoAgregado.id}`)

    botonEliminar.addEventListener('click', () => {
        botonEliminar.parentElement.remove()
        eliminarProductoCarrito(buzoAgregado)
        actualizarCarrito(carritoDeCompras)
    })
}


/* function traerCarritoUsuario(usuario) {
    let JSONProductos = localStorage.getItem("carrito_" + usuario)
    if (JSONProductos && JSONProductos.length > 0) {
        let productos = JSON.parse(JSONProductos);
        return productos;
    } else return [];
}
traerCarritoUsuario(chequeoUsuario) */

function checkId(productoAgregado) { 
    
    let ProductoRepetido = carritoDeCompras.includes(productoAgregado)
    let ProductoRepetidoLocal = carritoLocal.includes(productoAgregado)
    if (ProductoRepetido && ProductoRepetidoLocal === false) {
        carritoDeCompras.push(productoAgregado)
        localStorage.setItem("carrito_", JSON.stringify(carritoDeCompras))

    }else if(ProductoRepetidoLocal  === true ){
        let indexProductoAgregado = carritoLocal.findIndex(checkindex)
        function checkindex(carritoDeCompras) {
            return carritoDeCompras.id === productoAgregado.id
        }
        carritoDeCompras.splice(indexProductoAgregado, 1, {id: productoAgregado.id+productoAgregado.id, nombre: productoAgregado.nombre, tipo: productoAgregado.tipo, desc: productoAgregado.desc, precio: productoAgregado.precio, talle: productoAgregado.talle, imagen: productoAgregado.imagen});
        localStorage.setItem("carrito_", JSON.stringify(carritoDeCompras))
    } else {  
        carritoDeCompras.push(productoAgregado)
        let indexProductoAgregado = carritoDeCompras.findIndex(checkindex)
        function checkindex(carritoDeCompras) {
            return carritoDeCompras.id === productoAgregado.id
        }
        carritoDeCompras.splice(indexProductoAgregado, 1, {id: productoAgregado.id++, nombre: productoAgregado.nombre, tipo: productoAgregado.tipo, desc: productoAgregado.desc, precio: productoAgregado.precio, talle: productoAgregado.talle, imagen: productoAgregado.imagen});
        localStorage.setItem("carrito_", JSON.stringify(carritoDeCompras))
    }
}


function traerCarrito(array) {




    array.forEach((productoEnCarrito) => {
        let div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
          <p>${productoEnCarrito.tipo} "${productoEnCarrito.nombre}"</p>
          <p>Precio: $${productoEnCarrito.precio}</p>
          <button id="eliminar${productoEnCarrito.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
          `
        contenedorCarrito.appendChild(div)
        let botonEliminar = document.getElementById(`eliminar${productoEnCarrito.id}`)

        botonEliminar.addEventListener('click', () => {
            botonEliminar.parentElement.remove()
            eliminarProductoLocal(productoEnCarrito)
            actualizarCarrito(carritoLocal)
        })
    })
}

function eliminarProductoLocal(productoEnCarrito) {
    console.log(carritoLocal)
    let indexLocalEliminado = carritoLocal.findIndex(checkindex)
    function checkindex(carritoLocal) {
        return carritoLocal.id === productoEnCarrito.id
    }
    carritoLocal.splice(indexLocalEliminado, 1);
    localStorage.setItem("carrito_", JSON.stringify(carritoLocal))

}


function eliminarProductoCarrito(productoEliminado){
    let indexProductoEliminado = carritoDeCompras.findIndex(checkindex)
    function checkindex(carritoDeCompras) {
        return carritoDeCompras.id === productoEliminado.id
    }
    carritoDeCompras.splice(indexProductoEliminado, 1);
    localStorage.setItem("carrito_", JSON.stringify(carritoDeCompras))
}

function actualizarCarrito(carrito) {
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, el) => acc + el.precio, 0)
}

let botonConfirmarCompra = document.getElementById("ConfirmarCompra")

botonConfirmarCompra.addEventListener('click', () => {
    ConfirmarCompra()
})


function ConfirmarCompra(){
  localStorage.setItem("CompraRealizada", JSON.stringify(carritoDeCompras))
  location.href = "productos.html"
  ResetCarrito()
}

function ResetCarrito(){
    localStorage.removeItem("carrito_")
}

traerCarrito(carritoLocal)
actualizarCarrito(carritoLocal)