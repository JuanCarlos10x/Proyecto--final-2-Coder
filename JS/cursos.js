// variables
const cargarJSONBtn = document.querySelector('#cargarJSON');

// event listeners
cargarJSONBtn.addEventListener('click', obtenerDatos);

// funciones
function obtenerDatos() {

    // a la hora de extraer los datos del archivo json se debe de mostrar esta alerta
    Swal.fire({
        title: 'Los datos cargaron correctamente',
        icon: 'success',
        confirmButtonText: '',
        confirmButtonColor: '#fff',
        timer: '1000',
        timerProgressBar: true,
        width: '90%',
        padding: '2rem',
    })

    // cree una varaiable con la ruta del archivo para que sea más accesible de ocuapr
    const url = 'data/talleres.json';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarHTML(resultado))
}

// con esta funcion se debe de mostrar los valores que hay en el archivo
function mostrarHTML(talleres) {
    const contenido = document.querySelector('.contenedor');

    let html = '';

    talleres.forEach(taller => {
        const { price, nombre, empresa, curso } = taller;

        html += `  
        <div class="card text-center mb-10 tajeta">
        <p>Empresa ${empresa}</p>
        <p>Nombre ${nombre}</p>
        <p>Curso ${curso}</p>
        <p>Precio ${price}</p>
        </div>
        `
    });
    contenido.innerHTML = html;
}
