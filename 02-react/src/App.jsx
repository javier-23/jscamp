import { useState, useEffect } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import {HomePage} from './pages/Home.jsx'
import {SearchPage} from './pages/search.jsx'
import {NotFoundPage} from './pages/404.jsx'
import { Contact } from './pages/Contact'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    // Función que actualiza el estado con la nueva ruta
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    // Escuchar el evento popstate
    window.addEventListener('popstate', handleLocationChange)

    // Limpiar el event listener al desmontar
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  const currentPage = currentPath

  let page = <NotFoundPage />
  
  if (currentPage === '/') {
    page = <HomePage />
  } else if (currentPage === '/search') {
    page = <SearchPage />
  } else if (currentPage === '/contact') {
    page = <Contact />
  }
  
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}

export default App
