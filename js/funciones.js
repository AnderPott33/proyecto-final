// funciones.js

// URL base de la API de países
export const api = "https://restcountries.com/v3.1/name/";

// Diccionario de regiones y subregiones en español
const regiones = {
    "Europe": "Europa",
    "Americas": "América",
    "Asia": "Asia",
    "Africa": "África",
    "Oceania": "Oceanía"
};

const subregiones = {
    "Northern Europe": "Europa del Norte",
    "Southern Europe": "Europa del Sur",
    "Western Europe": "Europa Occidental",
    "Eastern Europe": "Europa del Este",
    "Central America": "América Central",
    "Caribbean": "Caribe",
    "South America": "América del Sur",
    "Northern Africa": "África del Norte",
    "Sub-Saharan Africa": "África Subsahariana",
    "Eastern Asia": "Asia Oriental",
    "Southern Asia": "Asia Meridional",
    "Southeast Asia": "Asia Sudoriental",
    "Western Asia": "Asia Occidental",
    "Oceania": "Oceanía"
};

// Diccionario de monedas en español
const monedas = {
    "Euro": "Euro",
    "United States dollar": "Dólar estadounidense",
    "British pound": "Libra esterlina",
    "Japanese yen": "Yen japonés",
    "Argentine peso": "Peso argentino",
    "Mexican peso": "Peso mexicano",
    "Paraguayan guaraní": "Guaraní paraguayo",
    "Brazilian real": "Real brasileño"
    // agregar más según necesidad
};

// Diccionario de idiomas actualizado
const idiomas = {
  "en": "Inglés",
  "es": "Español",
  "spa": "Español",
  "fr": "Francés",
  "pt": "Portugués",
  "por": "Portugués",
  "de": "Alemán",
  "it": "Italiano",
  "ja": "Japonés",
  "zh": "Chino",
  "ar": "Árabe",
  "gn": "Guaraní"
};

// Función principal para buscar país
export async function buscar(pais, mapaFondo, respuestaH) {
    try {
        const response = await fetch(`${api}${pais}`);
        if (!response.ok) throw new Error("País no encontrado");

        const data = await response.json();
        const country = data[0];

        // Nombre en español o en inglés si no existe
        const nombreES = country.translations?.spa?.common || country.name.common;

        // Moneda traducida
        const monedaAPI = Object.values(country.currencies)[0];
        const monedaES = monedas[monedaAPI.name] || monedaAPI.name;

        // Idiomas traducidos
        const idiomasES = Object.keys(country.languages)
            .map(code => idiomas[code] || country.languages[code])
            .join(", ");

        // Coordenadas
        const latlng = country.latlng;

        // Población y área
        const poblacion = country.population;
        const area = country.area.toLocaleString();
        const densidad = (poblacion / country.area).toFixed(2);

        // Centrar mapa y agregar marcador
        mapaFondo.setView(latlng, 5);
        if (window.marcadorPais) mapaFondo.removeLayer(window.marcadorPais);

        const icono = L.icon({
            iconUrl: country.flags.svg,
            iconSize: [50, 30],
            iconAnchor: [25, 15],
            popupAnchor: [0, -15]
        });

        window.marcadorPais = L.marker(latlng, { icon: icono, title: nombreES })
            .addTo(mapaFondo)
            .bindPopup(`<b>${nombreES}</b><br>Capital: ${country.capital}<br>Población: ${poblacion.toLocaleString()}`)
            .openPopup();

        // Panel de información
        respuestaH.innerHTML = `
            <div class="bg-black/70 p-4 sm:p-6 rounded-2xl text-white h-full overflow-auto">
                <img src="${country.flags.svg}" alt="Bandera de ${nombreES}" 
                     class="mx-auto mb-4 w-24 sm:w-32 h-16 sm:h-20 object-cover rounded-md shadow-md border border-white/30">
                <h1 class="text-xl sm:text-2xl font-bold mb-2 text-center">${nombreES}</h1>

                <div class="space-y-1 text-left text-white/90 text-sm sm:text-base">
                    <p><i class="fa-solid fa-landmark mr-2 text-blue-400"></i>Capital: <span class="font-semibold">${country.capital}</span></p>
                    <p><i class="fa-solid fa-coins mr-2 text-yellow-400"></i>Moneda: <span class="font-semibold">${monedaAPI.symbol} - ${monedaES}</span></p>
                    <p><i class="fa-solid fa-users mr-2 text-green-400"></i>Población: <span class="font-semibold">${poblacion.toLocaleString()}</span></p>
                    <p><i class="fa-solid fa-ruler-combined mr-2 text-purple-400"></i>Área: <span class="font-semibold">${area} km²</span></p>
                    <p><i class="fa-solid fa-person-rays mr-2 text-pink-400"></i>Densidad: <span class="font-semibold">${densidad} hab/km²</span></p>
                    <p><i class="fa-solid fa-language mr-2 text-indigo-400"></i>Idiomas: <span class="font-semibold">${idiomasES}</span></p>
                    <p><i class="fa-solid fa-phone mr-2 text-blue-400"></i>Prefijo: <span class="font-semibold">${country.idd.root}${country.idd.suffixes[0]}</span></p>
                    <p><i class="fa-solid fa-clock mr-2 text-gray-300"></i>Zona horaria: <span class="font-semibold">${country.timezones[0]}</span></p>
                </div>

                <div class="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3">
                    <p class="bg-blue-800/50 text-white px-2 py-1 rounded-full text-xs sm:text-sm">Región: ${regiones[country.region] || country.region}</p>
                    <p class="bg-purple-800/50 text-white px-2 py-1 rounded-full text-xs sm:text-sm">Subregión: ${subregiones[country.subregion] || country.subregion}</p>
                </div>
            </div>
        `;

    } catch (error) {
        console.error(error);
        respuestaH.innerHTML = `<p class="text-red-600 font-bold">${error.message}</p>`;
    }
}