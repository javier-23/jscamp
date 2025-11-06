export function SearchFormSection() {
    return (
      <section className="seccion-busqueda-empleos">
              <h1>Encuentra tu próximo trabajo</h1>
              <p>Explora las ofertas de empleo más recientes y encuentra el trabajo ideal para ti.</p>

              <form role="search">
                  <div className="barra-busqueda-empleo">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
                      <input id="empleos-search-input" type="text" placeholder="Buscar trabajos, empresas o habilidades" />
                  </div>

                  <div className="filtros-busqueda-empleo">
                      <select name="tecnologia" id="filter-technology">
                          <option value="">Tecnología</option>
                          <option value="javascript">JavaScript</option>
                          <option value="python">Python</option>
                          <option value="java">Java</option>
                          <option value="react">React</option>
                          <option value="node">Node.js</option>
                      </select>

                      <select name="location" id="filter-location">
                          <option value="">Ubicación</option>
                          <option value="remoto">Remoto</option>
                          <option value="hibrido">Híbrido</option>
                          <option value="nuevayork">Nueva York</option>
                          <option value="madrid">Madrid</option>
                          <option value="londres">Londres</option>
                      </select>

                      <select name="experience-level" id="filter-experience-level">
                          <option value="">Nivel de experiencia</option>
                          <option value="junior">Junior</option>
                          <option value="mid">Mid-level</option>
                          <option value="senior">Senior</option>
                          <option value="lead">Lead</option>
                      </select>
                  </div>
              </form>
          </section>
    )
  }