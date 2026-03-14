// Importa la función 'buscar' desde el archivo funciones.js
import { buscar } from './funciones.js';

// Selecciona el div donde se mostrará la información del país
const respuestaH = document.querySelector("#informacionPais");

// Selecciona el botón de búsqueda y el input de texto
const btnBuscar = document.querySelector("#buscarPais");
const inputPais = document.querySelector("#paisBuscado");

// Configura la capa de mapa OpenStreetMap estándar
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors' // Atribución obligatoria
});

// Configura una capa de mapa tipo satélite (OpenStreetMap HOT)
const satelite = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
});

// Inicializa el mapa en el div "mapaFondo"
const mapaFondo = L.map("mapaFondo", {
    zoomControl: true,      // Habilita control de zoom
    layers: [osm],          // Capa inicial
    dragging: true,         // Permite arrastrar el mapa
    scrollWheelZoom: true,  // Permite zoom con scroll
}).setView([20, 0], 2);     // Centro inicial y nivel de zoom global

// Agrega control para cambiar entre capas "Mapa" y "Satelite"
L.control.layers({
    "Mapa": osm,
    "Satelite": satelite
}).addTo(mapaFondo);

// Agrega escala de medición al mapa
L.control.scale().addTo(mapaFondo);

// Evento click del botón de búsqueda
btnBuscar.addEventListener("click", () => {
    const pais = inputPais.value.trim(); // Obtiene el valor del input y elimina espacios
    if (pais) buscar(pais, mapaFondo, respuestaH); // Llama a la función buscar si hay texto
});