

btnRegistrate.style.display = "none"

linkRegistro.onclick = (e) => {
    e.preventDefault()
    mostrarRegistro()
}

btnRegistrate.onclick = (e) => {
    e.preventDefault()
    crearUsuario()
}

btnIngresar.onclick = (e) => {
    e.preventDefault()
    login(inputUsuario.value, inputClave.value)
}