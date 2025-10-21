import { MAX_RESULTS } from './config.js';

// ------------------------------------------------
// Resultados de búsqueda
const container = document.querySelector('.jobs-listings');

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {

    jobs.forEach((job, index) => {
        const article = document.createElement('article')
        article.className = 'job-listing-card'

        // Ocultar los trabajos que excedan el límite inicial
        if (index >= MAX_RESULTS) {
            article.classList.add('is-hidden');
        }

        article.dataset.modalidad = job.data.modalidad
        article.dataset.nivel = job.data.nivel
        article.dataset.technology = job.data.technology

        article.innerHTML = 
            `<div>
                <h3>${job.titulo}</h3>
                <small>${job.empresa} | ${job.ubicacion}</small>
                <p>${job.descripcion}</p>
            </div>
            <button class="button-apply-job">Aplicar</button>`

        container.appendChild(article)
    })
  });