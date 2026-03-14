# Proyecto Final - Frontend: Buscador de Países

## Descripción
Este proyecto es una aplicación web interactiva que permite **buscar países** y obtener información detallada sobre ellos, mostrando la información en un panel lateral y ubicando el país en un **mapa interactivo**. La información incluye datos como capital, población, área, densidad, idiomas, moneda, zona horaria, prefijo telefónico, región y subregión.

La aplicación utiliza **JavaScript moderno (ES6)** y la API pública [REST Countries v3](https://restcountries.com/) para obtener los datos de los países. Además, integra **Leaflet** para mostrar mapas interactivos y **TailwindCSS** para los estilos rápidos y responsivos.

---

## Funcionalidades

1. **Búsqueda de países**:
   - El usuario ingresa el nombre de un país en el input.
   - Al hacer click en el botón de búsqueda, se consulta la API REST y se muestra la información.

2. **Mapa interactivo**:
   - Se muestra un mapa mundial utilizando **Leaflet**.
   - Se pueden cambiar las capas entre **Mapa** y **Satelite**.
   - Zoom y arrastre habilitados.
   - Se centra automáticamente en el país buscado.
   - Se coloca un marcador con la **bandera del país** como ícono.
   - El marcador muestra un popup con el nombre, capital y población.

3. **Panel de información del país**:
   - Muestra:
     - Bandera
     - Nombre del país
     - Capital
     - Moneda (símbolo y nombre)
     - Población
     - Área y densidad poblacional
     - Idiomas
     - Prefijo telefónico
     - Zona horaria
     - Región y subregión
   - Diseñado con **TailwindCSS** para responsividad y estilos modernos.
   - Scroll automático si la información excede la altura del contenedor.

4. **Validaciones y errores**:
   - Si el país no es encontrado, se muestra un mensaje de error en rojo.
   - Evita búsquedas vacías.

---

## Tecnologías utilizadas

- **HTML5**: Estructura de la página.
- **CSS3 + TailwindCSS**: Estilos rápidos, responsivos y modernos.
- **JavaScript (ES6 Modules)**: Lógica del frontend y consumo de API.
- **Font Awesome**: Íconos representativos de cada dato.
- **Leaflet.js**: Librería para mapas interactivos.
- **REST Countries API v3**: API gratuita para obtener datos de países.

---

## Estructura del proyecto
/proyecto-final-frontend
│
├─ index.html # Página principal
├─ /js
│ ├─ app.js # Configuración de Leaflet y eventos
│ └─ funciones.js # Función buscar y manejo de la API
├─ /css (opcional) # CSS adicional si se requiere
└─ README.md # Documentación del proyecto


---

## Uso

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en un navegador moderno.
3. Ingresar el nombre del país en el input.
4. Hacer click en el botón de búsqueda.
5. Observar:
   - El país se centra en el mapa.
   - Se crea un marcador con la bandera.
   - El panel lateral muestra toda la información relevante.

---

## Personalización

- Se pueden agregar más capas de mapa en `app.js` con Leaflet.
- Los estilos se pueden personalizar modificando clases de TailwindCSS.
- Se pueden añadir más datos del país desde la API, como fronteras, región económica, etc.

---

## Capturas de pantalla

*(Opcional: agregar imágenes de la app funcionando)*

---

## Créditos

- API REST Countries v3: https://restcountries.com/
- Leaflet.js: https://leafletjs.com/
- Font Awesome: https://fontawesome.com/
- TailwindCSS: https://tailwindcss.com/

---

## Licencia

MIT License (si deseas agregar licencia)