// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let artiuclosCarrito = [];

// event listeners
cargarEventListeners();

function cargarEventListeners() {
    // cuando agregas un curso presionado 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);

    // elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // muestra los cursos del carrito
    document.addEventListener('DOMContentLoaded', () => {
        artiuclosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        artiuclosCarrito = []; // reseteamos el carrito

        limpiarHTML(); // elimina todo el HTML

        Swal.fire({
            title: 'Compra realizada con exito',
            icon: 'success',
            confirmButtonText: '',
            confirmButtonColor: '#fff',
            timer: '1000',
            timerProgressBar: true,
            width: '90%',
            padding: '2rem',
        }) // este es para el boton de vaciar carrito --- Me parecio lo más logico ocupar Sweet Alert para mi poryecto,
        // Proporciona más informacion para saber si se agrego un elemento o se elimino o se ha vaciado el carrito 
    })
}

// funciones

// agrega un curso al carrito
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

    Swal.fire({
        title: 'Se agrego el curso al carrito',
        icon: 'success',
        confirmButtonText: '',
        confirmButtonColor: '#fff',
        timer: '1000',
        timerProgressBar: true,
        width: '90%',
        padding: '2rem',
    }) // para cuando se haga click sobre agregar carrito
}

// elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo del articulosCarrito por el data-id
        artiuclosCarrito = artiuclosCarrito.filter(curso => curso.id !== cursoId);

        Swal.fire({
            title: 'Se ha eliminado el curso del carrito',
            icon: 'warning',
            confirmButtonText: '',
            confirmButtonColor: '#fff',
            timer: '1000',
            timerProgressBar: true,
            width: '90%',
            padding: '2rem',
        }) // para cuando se de click sobre la X 

        carritoHTML(); // iterar sobre el carrito y mostrar su HTML
    }
}

// lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // revisa si un elemto ya existe en el carrtio
    const existe = artiuclosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // actualizar la cantidad
        const cursos = artiuclosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        artiuclosCarrito = [...cursos];
    } else {
        // agregamos el curso al carrito
        artiuclosCarrito = [...artiuclosCarrito, infoCurso];
    }

    console.log(artiuclosCarrito)

    carritoHTML();
}

// muestra el carrito de compras en el HTML
function carritoHTML() {

    // limpiar el html
    limpiarHTML();

    // recorre el carrito y genera el HTML
    artiuclosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        // agregando el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });

    // agregar al carrito de compras al storage
    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(artiuclosCarrito));
}

// eliminar los elemtos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}