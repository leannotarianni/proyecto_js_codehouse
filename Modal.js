
const carritoAbrir = document.getElementById('BtnCarrito');
const carritoCerrar = document.getElementById('CarritoCerrar');

const contenedorModal = document.getElementsByClassName('Modal-Contenedor')[0]
const modalCarrito = document.getElementsByClassName('Modal-Carrito')[0]

carritoAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})

carritoCerrar.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})

modalCarrito.addEventListener('click',(e)=>{
    e.stopPropagation()
})
contenedorModal.addEventListener('click',()=>{
    carritoCerrar.click()
})