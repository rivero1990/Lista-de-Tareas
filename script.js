const inputTareaAgregada = document.querySelector("#tarea-agregada");
const inputTareaBuscada = document.querySelector("#tarea-buscada");
const inputPosTarea = document.querySelector("#posicion-actualizar");
const inputActualizarTarea = document.querySelector("#nueva-tarea-actualizada");
const inputBorrarPosicion = document.querySelector("#posicion-borrar");
const inputBorrarLista = document.querySelector("#lista-tareas-eliminada");
const divTareaBuscada = document.querySelector("#contenedor-tarea-buscada");
const divTareaAgregada = document.querySelector("#contenedor-tarea-agregada");

let tareas = obtenerTareas();


/* Asegura que la lista de tareas se cargue cuando la pagina este lista */

document.addEventListener('DOMContentLoaded', cargarTareas);


/**
 * Obtiene las tareas almacenadas en el local storage
 */
function obtenerTareas() {
    JSON.parse(localStorage.getItem('tareas')) || [];
}


/**
 * Guarda las tareas en el local storage
 */
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}


/**
 * Agrega una nueva tarea a la lista
 */
function agregarTarea() {
    let textoTarea = inputTareaAgregada.value;
    if (textoTarea) {
        if (!tareas) {
            tareas = []; 
        }
        tareas.push({
            texto: textoTarea
        });
        guardarTareas();
        inputTareaAgregada.value = '';
        cargarTareas();
    }
}


/**
 * Busca una tarea especifica por su posicion
 */
function buscarTarea() {
    let posicion = parseInt(inputTareaBuscada.value);
    if (posicion >= 0 && posicion < tareas.length) {
        const tarea = tareas[posicion];
        divTareaBuscada.innerHTML = `
            <h3>Tarea Buscada</h3>
            <p>${tarea.texto}</p>
        `;
    } else {
        divTareaBuscada.innerHTML = `
            <h3>Tarea Buscada</h3>
            <p>No se encontró la tarea.</p>
        `;
    }
}

/**
 * Actualiza una tarea especifica por su posicion
 */
function actualizarTarea() {
    let posicion = parseInt(inputPosTarea.value);
    let nuevaTarea = inputActualizarTarea.value;
    if (posicion >= 0 && posicion < tareas.length && nuevaTarea) {
        tareas[posicion].texto = nuevaTarea;
        guardarTareas();
        inputPosTarea.value = '';
        inputActualizarTarea.value = '';
        cargarTareas();
        divTareaBuscada.querySelector('p').innerHTML = ''; 
    }
}


/**
 * Borra una tarea especifica por su posicion
 */
function borrarTarea() {
    let posicion = parseInt(inputBorrarPosicion.value);
    if (posicion >= 0 && posicion < tareas.length) {
        if (tareas) {
            tareas.splice(posicion, 1);
            guardarTareas();
            inputBorrarPosicion.value = '';
            cargarTareas();
        }
    }
}


/**
 * Actualiza la lista de tareas en la página web a partir de los datos almacenados en el almacenamiento local.
 */
function cargarTareas() {
    let listaTareas = divTareaAgregada.querySelector('ol');
    listaTareas.innerHTML = ''; 

    if (tareas && tareas.length > 0) {
        for (let i = 0; i < tareas.length; i++) {
            let tarea = tareas[i];
            let li = document.createElement('li');
            li.innerHTML = `${tarea.texto}`;
            listaTareas.appendChild(li);
        }
    } 
}


/**
 * Elimina toda la lista de tareas
 */
function eliminarTareas() {
    tareas = [];
    guardarTareas();
    cargarTareas();
}




