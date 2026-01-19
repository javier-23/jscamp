import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { SearchFormSection } from '../components/SearchFormSection'
import { Pagination } from '../components/Pagination'
import { JobListings } from '../components/JobListings'
import { Spinner } from '../components/Spinner'
import { useRouter } from '../hook/useRouter.jsx'

const RESULTS_PER_PAGE = 5

// Custom hook
const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultFilters = {
    technology: '',
    location: '',
    experienceLevel: '',
  }

  const loadFiltersFromLocalStorage = () => {
    try {
      const stringFilters = localStorage.getItem('jobFilters')
      
      if(stringFilters != null){
          const savedFilters = JSON.parse(stringFilters)
          return savedFilters
      }
      else{
        return defaultFilters
      }
    } catch (error) {
      console.error('Error parsing filters from localStorage:', error)
      return defaultFilters
    }
  }

  const loadTextFromLocalStorage = () => {
    try {
      return localStorage.getItem('jobSearchText') || ''
    } catch (error) {
      return ''
    }
  }

  // Cargar filtros guardados en la URL o localStorage
  const [filters, setFilters] = useState(() => {
    const savedFilters = loadFiltersFromLocalStorage()

    const nextFilters = {}
  
    nextFilters.technology = searchParams.get('technology') || savedFilters.technology || ''
    nextFilters.location = searchParams.get('type') || savedFilters.location || ''
    nextFilters.experienceLevel = searchParams.get('level') || savedFilters.experienceLevel || ''
    
    return nextFilters
  })

  // Cargar texto de búsqueda guardado en la URL o localStorage
  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || loadTextFromLocalStorage() || '')

  // Estado con la página actual, carga página actual desde la URL
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get('page')

    if (!pageParam) return 1

    const page = Number(pageParam)

      if (Number.isNaN(page) || page < 1) {
        return 1
      }

      return page
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {navigateTo} = useRouter()

  // Guardar los filtros en el localStorage
  useEffect(() => {
    try{
      localStorage.setItem('jobFilters', JSON.stringify(filters))
    } catch (error) {
      console.error('Error saving filters to localStorage:', error)
    }
  }, [filters])

  // Guardar el texto de búsqueda
  useEffect(() => {
    try{
      localStorage.setItem('jobSearchText', textToFilter)
    } catch (error) {
      console.error('Error saving search text to localStorage:', error)
    }
  }, [textToFilter])

  // Obtener los trabajos desde la API cuando cambian los filtros, texto de búsqueda o página actual
  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString()

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        if(!response.ok){
          throw new Error(`Error ${response.status}`)
        }
        
        const json = await response.json()
        
        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setError(error.message)
      } finally{
        setLoading(false)
      }
    }
    fetchJobs()
  }, [textToFilter, filters, currentPage])

  // Sincronizar los filtros y la página actual con los parámetros de la URL
  useEffect(() => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams)
      
      if (textToFilter) params.set('text', textToFilter)
        else params.delete('text')
      if (filters.technology) params.set('technology', filters.technology)
        else params.delete('technology')
      if (filters.location) params.set('type', filters.location)
        else params.delete('type')
      if (filters.experienceLevel) params.set('level', filters.experienceLevel)
        else params.delete('level')
      
      if(currentPage > 1){
        params.set('page', currentPage)
      }
      else if(currentPage === 1){
        params.delete('page')
      }
      
      return params
    })

  }, [textToFilter, filters, currentPage, setSearchParams])


  // Calcular el total de páginas redondeando hacia arriba
  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setTextToFilter(filters.search || '')
    setCurrentPage(1)
  }

  const handleTextFilter = (newText) => {
    setTextToFilter(newText)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setFilters(defaultFilters)
    setTextToFilter('')
    localStorage.removeItem('jobFilters')
    localStorage.removeItem('jobSearchText')
    setCurrentPage(1)
  }

  const handleRetry = () => {
    setError(null)
    setCurrentPage(1)
    window.location.reload()
  }

  return {
    loading,
    totalPages,
    currentPage,
    handlePageChange, 
    handleSearch,
    handleTextFilter,
    handleReset,
    jobs,
    total,
    filters,
    textToFilter,
    error,
    handleRetry
  }
}

export default function SearchPage() {
  
  const {
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleReset,
    jobs,
    total,
    filters,
    textToFilter,
    error,
    handleRetry
  } = useFilters()

  const title = loading 
    ? 'Cargando...' 
    : error 
    ? 'Error al cargar' 
    : `Resultados: ${total}, Página ${currentPage} - DevJobs`

  return (
    <main>
      <title>{title}</title>
      <meta name="description" content="Encuentra las mejores ofertas de trabajo para desarrolladores en DevJobs."></meta>
      
      {/* Formulario de búsqueda */}
        <SearchFormSection 
          onSearch={handleSearch} 
          onTextFilter={handleTextFilter} 
          onReset={handleReset}
          initialFilters={filters}
          initialText={textToFilter}
          />
        
        <section>

          {/* Spinner de carga */}
          {loading && <Spinner/>}

          {/* Mensaje de error */}
          {error && !loading &&(
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--text-light)'
            }}>
              <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>
                Error al cargar los trabajos
              </h2>
              <p style={{ marginBottom: '1.5rem' }}>{error}</p>
              <button 
                onClick={handleRetry}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--primary-light)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Listado de trabajos */}
          {!loading && !error && <JobListings jobs={jobs}/>}
          
          {/* Paginación */}
          {!loading && !error && totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}

          {/* Texto informando con el rango de trabajos mostrados */}
          {!loading && !error && total > 0 && (
              <p 
                style={{"display": "flex", "justifyContent": "center", 
                        "alignItems": "center", "marginBottom": "2rem", 
                        "marginTop": "1rem", "color": "var(--text-light)"}}>
                  Mostrando {(currentPage - 1) * RESULTS_PER_PAGE + 1} -{' '}
                  {Math.min(currentPage * RESULTS_PER_PAGE, total)} de {total} trabajos
              </p>
          )}
        </section>
    </main>
  )
}