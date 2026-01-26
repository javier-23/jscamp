import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

// Para cargar las páginas que necesito, no descarga el código hasta que navego a esa ruta
const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const JobDetail = lazy(() => import('./pages/Detail.jsx'))
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))

import {Spinner} from './components/Spinner.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

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
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
            } />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
      </Suspense>

      <Footer />
    </>
  )
}

export default App
