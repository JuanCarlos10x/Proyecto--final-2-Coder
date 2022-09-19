// Variables

const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas');
let tareas = [];

// Evemt listeners

eventListeners();

function eventListeners() {
    // cuando el usuario agrega una nueva tarea
    formulario.addEventListener('submit', agregarTarea);

    // cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        console.log(tareas);

        crearHTML();
    });
}

// Funciones

function agregarTarea(e) {
    e.preventDefault();

    console.log('agregando')

    // textarea donde el usuario escribe
    const tarea = document.querySelector('#tarea').value;

    if (tarea === '') {
        mostrarError('Ingresa una tarea')

        return;
    }

    const tareaObj = {
        id: Date.now(),
        tarea
    }

    // añadir al arreglo de tareas
    tareas = [...tareas, tareaObj];

    // crear html
    crearHTML();

    // reiniciar el formulario
    formulario.reset();
}

// mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    // insertalo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {

    limpiarHTML();

    if (tareas.length > 0) {
        tareas.forEach(tarea => {
            // agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tarea');
            btnEliminar.innerText = 'X';

            // añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTarea(tarea.id)
            }

            // crear html
            const li = document.createElement('li');

            // añadir al texto
            li.innerText = tarea.tarea;

            // asignar el bonton
            li.appendChild(btnEliminar);

            // insertarlo en el html
            listaTareas.appendChild(li);
        })
    }

    sincronizarStorage();

}

// agregar las tareas actualues a localstorage

function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// eliminar tarea
function borrarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id)

    crearHTML();
}

// limpiar el html

function limpiarHTML() {
    while (listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
}