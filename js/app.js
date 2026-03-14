import { buscar } from './funciones.js';

const respuestaH = document.querySelector("#informacionPais");
const btnBuscar = document.querySelector("#buscarPais");
const inputPais = document.querySelector("#paisBuscado");

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
});

const satelite = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
});

const mapaFondo = L.map("mapaFondo", {
    zoomControl: true,
    layers: [osm],
    dragging: true,
    scrollWheelZoom: true,
}).setView([20, 0], 2);

L.control.layers({
    "Mapa": osm,
    "Satelite": satelite
}).addTo(mapaFondo);

L.control.scale().addTo(mapaFondo);

btnBuscar.addEventListener("click", () => {
    const pais = inputPais.value.trim();
    if (pais) buscar(pais, mapaFondo, respuestaH);
});