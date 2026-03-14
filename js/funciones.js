// URL base de la API de países
export const api = "https://restcountries.com/v3.1/name/";

// Función asincrónica para buscar información de un país
// Parámetros:
// pais: nombre del país a buscar
// mapaFondo: instancia de Leaflet para mostrar el mapa
// respuestaH: elemento HTML donde se mostrará la información
export async function buscar(pais, mapaFondo, respuestaH) {
    try {
        // Se realiza la petición a la API concatenando el nombre del país
        const response = await fetch(`${api}${pais}`);
        
        // Si la respuesta no es correcta, se lanza un error
        if (!response.ok) throw new Error("País no encontrado");
        
        // Convertimos la respuesta en JSON
        const data = await response.json();
        const country = data[0]; // Tomamos el primer resultado

        // Extraemos información del país
        const moneda = Object.values(country.currencies)[0]; // Moneda
        const idiomas = Object.values(country.languages).join(", "); // Idiomas
        const latlng = country.latlng; // Latitud y longitud
        const poblacion = country.population; // Población
        const area = country.area.toLocaleString(); // Área con separador de miles
        const densidad = (poblacion / country.area).toFixed(2); // Densidad poblacional

        // Centrar el mapa en las coordenadas del país con zoom 5
        mapaFondo.setView(latlng, 5);

        // Si ya existe un marcador anterior, lo eliminamos
        if (window.marcadorPais) mapaFondo.removeLayer(window.marcadorPais);

        // Crear un ícono personalizado usando la bandera del país
        const icono = L.icon({
            iconUrl: country.flags.svg, // URL de la bandera
            iconSize: [50, 30],         // Tamaño del ícono
            iconAnchor: [25, 15],       // Punto de anclaje del ícono
            popupAnchor: [0, -15]       // Punto de anclaje del popup
        });

        // Crear el marcador del país en el mapa con el ícono personalizado
        window.marcadorPais = L.marker(latlng, { icon: icono, title: country.name.common })
            .addTo(mapaFondo)
            .bindPopup(`
                <b>${country.name.common}</b><br>
                Capital: ${country.capital}<br>
                Población: ${poblacion.toLocaleString()}
            `)
            .openPopup(); // Abrir el popup automáticamente

        // Insertar la información detallada del país en el div respuestaH
        respuestaH.innerHTML = `
            <div class="bg-black/70 p-6 rounded-2xl text-white h-full overflow-auto">
                <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" class="mx-auto mb-4 w-32 h-20 object-cover rounded-md shadow-md border border-white/30">
                <h1 class="text-2xl font-bold mb-2 text-center">${country.name.common}</h1>

                <div class="space-y-1 text-left text-white/90">
                    <p><i class="fa-solid fa-landmark mr-2 text-blue-400"></i>Capital: <span class="font-semibold">${country.capital}</span></p>
                    <p><i class="fa-solid fa-coins mr-2 text-yellow-400"></i>Moneda: <span class="font-semibold">${moneda.symbol} - ${moneda.name}</span></p>
                    <p><i class="fa-solid fa-users mr-2 text-green-400"></i>Población: <span class="font-semibold">${poblacion.toLocaleString()}</span></p>
                    <p><i class="fa-solid fa-ruler-combined mr-2 text-purple-400"></i>Área: <span class="font-semibold">${area} km²</span></p>
                    <p><i class="fa-solid fa-person-rays mr-2 text-pink-400"></i>Densidad: <span class="font-semibold">${densidad} hab/km²</span></p>
                    <p><i class="fa-solid fa-language mr-2 text-indigo-400"></i>Idiomas: <span class="font-semibold">${idiomas}</span></p>
                    <p><i class="fa-solid fa-phone mr-2 text-blue-400"></i>Prefijo: <span class="font-semibold">${country.idd.root}${country.idd.suffixes[0]}</span></p>
                    <p><i class="fa-solid fa-clock mr-2 text-gray-300"></i>Zona horaria: <span class="font-semibold">${country.timezones[0]}</span></p>
                </div>

                <div class="flex justify-center gap-4 mt-3">
                    <p class="bg-blue-800/50 text-white px-3 py-1 rounded-full">Región: ${country.region}</p>
                    <p class="bg-purple-800/50 text-white px-3 py-1 rounded-full">Subregión: ${country.subregion}</p>
                </div>
            </div>
        `;

    } catch (error) {
        // Mostrar error en consola y en la interfaz si falla la búsqueda
        console.error(error);
        respuestaH.innerHTML = `<p class="text-red-600 font-bold">${error.message}</p>`;
    }
}