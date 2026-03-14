export const api = "https://restcountries.com/v3.1/name/";

export async function buscar(pais, mapaFondo, respuestaH) {
    try {
        const response = await fetch(`${api}${pais}`);
        if (!response.ok) throw new Error("País no encontrado");
        const data = await response.json();
        const country = data[0];

        const moneda = Object.values(country.currencies)[0];
        const idiomas = Object.values(country.languages).join(", ");
        const latlng = country.latlng;
        const poblacion = country.population;
        const area = country.area.toLocaleString();
        const densidad = (poblacion / country.area).toFixed(2);

        mapaFondo.setView(latlng, 5);

        if (window.marcadorPais) mapaFondo.removeLayer(window.marcadorPais);

        const icono = L.icon({
            iconUrl: country.flags.svg,
            iconSize: [50, 30],
            iconAnchor: [25, 15],
            popupAnchor: [0, -15]
        });

        window.marcadorPais = L.marker(latlng, { icon: icono, title: country.name.common })
            .addTo(mapaFondo)
            .bindPopup(`
                <b>${country.name.common}</b><br>
                Capital: ${country.capital}<br>
                Población: ${poblacion.toLocaleString()}
            `)
            .openPopup();
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
        console.error(error);
        respuestaH.innerHTML = `<p class="text-red-600 font-bold">${error.message}</p>`;
    }
}