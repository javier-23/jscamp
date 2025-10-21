// const botones = document.querySelectorAll('.button-apply-job');

// botones.forEach(boton => {
//     boton.addEventListener('click', () => {
//         boton.textContent = '¡Aplicado!';
//         boton.disabled = true; // Deshabilita el botón después de hacer clic
//         boton.classList.add('is-applied'); // Añade una clase para cambiar el estilo
//     });
// });

const jobsListingSection = document.querySelector('.jobs-listings');

jobsListingSection?.addEventListener('click', (event) => {
    const elemento = event.target;

    if(elemento.classList.contains('button-apply-job')){
        elemento.textContent = '¡Aplicado!';
        elemento.disabled = true; // Deshabilita el botón después de hacer clic
        elemento.classList.add('is-applied'); // Añade una clase para cambiar el estilo
    }
});