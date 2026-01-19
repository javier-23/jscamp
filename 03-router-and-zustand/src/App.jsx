import { Routes, Route } from 'react-router'
import { lazy, Suspense, useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

// Para cargar las páginas que necesito, no descarga el código hasta que navego a esa ruta
const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const JobDetail = lazy(() => import('./pages/Detail.jsx'))

import {Spinner} from './components/Spinner.jsx'

function App() {

  return (
    <>
      <Header />

      <Suspense // Para mostrar contenido de espera mientras carga el componente
        fallback={<Spinner texto="Cargando página..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  )
}

export default App
