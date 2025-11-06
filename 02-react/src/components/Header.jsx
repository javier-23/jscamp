function Header() {
  return (
    <header>
        <h1>
            <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>    
            DevJobs
        </h1>

        <nav aria-label="Navegación principal">
            <ul>
                <li>
                    <a href="#inicio">Inicio</a>
                </li>
                <li>
                    <a href="#jobs">Empleos</a>
                </li>
                <li>
                    <a href="#about">Acerca</a>
                </li>
                <li>
                    <a href="#contact">Contacto</a>
                </li>
            </ul>
        </nav>

        <div>
            <button className="btn-login">Subir CV</button>
        </div>
    </header>
  )
}

export default Header