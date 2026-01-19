import {Link} from './Link'
import { NavLink } from 'react-router'
import { useAuthStore } from '../store/authStore.js'

function Header( ) {
    const { isLoggedIn, handleLogin, handleLogOut } = useAuthStore()


    return (
        <header>
            <a href="/" style={{margin: 0}}>
                <h1>
                    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>    
                    DevJobs
                </h1>
            </a>

            <nav aria-label="Navegación principal">
                <ul>
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li>
                        <NavLink 
                            className={ ({isActive}) => isActive ? 'active-link' : '' }
                            to="/search"
                            aria-label="Ir a empleos"
                        >Empleos</NavLink>
                    </li>
                    <li>
                        <Link href="#about">Acerca</Link>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            aria-label="Ir a contacto"
                            className={ ({isActive}) => isActive ? 'active-link' : '' }
                        >Contacto</NavLink>
                    </li>
                </ul>
            </nav>

            <div>
                {isLoggedIn 
                    ? <button className="btn-login" onClick={handleLogOut}>Cerrar sesión</button>
                    : <button className="btn-login" onClick={handleLogin}>Iniciar sesión</button> 
                }
            </div>
        </header>
    )
}

export default Header