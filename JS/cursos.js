const cargarJSONBtn = document.querySelector('#cargarJSON');
cargarJSONBtn.addEventListener('click', obtenerDatos);

function obtenerDatos() {

    Swal.fire({
        title: 'Los datos cargaron correctamente',
        icon: 'success',
        confirmButtonText: '',
        timer: '1000',
        timerProgressBar: true,
        width: '90%',
        padding: '2rem',
    })

    const url = 'data/talleres.json';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarHTML(resultado))
}

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
