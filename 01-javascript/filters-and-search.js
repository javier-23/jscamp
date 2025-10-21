import { MAX_RESULTS } from './config.js';

// ----------------------------------------
// Función con la lógica de los filtros y la búsqueda

function applyFiltersAndSearch() {
  const jobs = document.querySelectorAll('.job-listing-card');

  // Obtener la búsqueda
  const searchTerm = searchInput.value.toLowerCase();

  // Obtener los valores de los filtros
  const selectedLocation = filterLocation.value;
  const selectedTechnology = filterTechnology.value;
  const selectedExperienceLevel = filterExperienceLevel.value;

  // Contador de resultados visibles
  let contador = 0;

  jobs.forEach(job => {
      // Titulo del empleo
      const title = job.querySelector('h3').textContent.toLowerCase();

      // Datos del empleo del JSON
      const modalidad = job.dataset.modalidad;
      const technology = job.dataset.technology;
      const experienceLevel = job.dataset.nivel;

      // Verificar si coincide con la búsqueda
      const matchesSearch = title.includes(searchTerm);

      // Verificar si coincide con los filtros
      const matchesLocation = selectedLocation === '' || modalidad === selectedLocation;
      const matchesTechnology = selectedTechnology === '' || technology.includes(selectedTechnology);
      const matchesExperienceLevel = selectedExperienceLevel === '' || experienceLevel === selectedExperienceLevel;

      const isShown = matchesSearch && matchesLocation && matchesTechnology && matchesExperienceLevel && (contador < MAX_RESULTS);
      
      if(isShown) {
          contador++;
      }

      job.classList.toggle('is-hidden', !isShown);
  });

}

// ------------------------------------------------
// Búsqueda
const searchInput = document.getElementById('empleos-search-input');

searchInput.addEventListener('input', applyFiltersAndSearch);


// ----------------------------------------
// Filtro de tecnología

const filterTechnology = document.getElementById('filter-technology')

filterTechnology.addEventListener('change', () => {
  applyFiltersAndSearch();
})


// ----------------------------------------
// Filtro de ubicación
const filterLocation = document.getElementById('filter-location')

filterLocation.addEventListener('change', () => {
  applyFiltersAndSearch();
})


// ------------------------------------------------
// Filtro de nivel de experiencia

const filterExperienceLevel = document.getElementById('filter-experience-level')

filterExperienceLevel.addEventListener('change', () => {
  applyFiltersAndSearch();
})