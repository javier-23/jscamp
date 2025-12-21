import { useState, useEffect, use } from 'react'

import { SearchFormSection } from '../components/SearchFormSection'
import { Pagination } from '../components/Pagination'
import { JobListings } from '../components/JobListings'

const RESULTS_PER_PAGE = 5

// Custom hook
const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter)
          params.append('text', textToFilter)
        if (filters.technology)
          params.append('technology', filters.technology)
        if (filters.location)
          params.append('type', filters.location)
        if (filters.experienceLevel)
          params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString()

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()
        
        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally{
        setLoading(false)
      }
    }
    fetchJobs()
  }, [textToFilter, filters.technology, filters.location, filters.experienceLevel, currentPage])

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
    setFilters({
      technology: '',
      location: '',
      experienceLevel: '',
    })
    setTextToFilter('')
    setCurrentPage(1)
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
    total
  }
}

export function SearchPage() {
  
  const {
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleReset,
    jobs,
    total
  } = useFilters()

  return (
    <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} onReset={handleReset}/>
        
        <section>
          {
            loading ? <p style={{"textAlign": "center", "marginTop": "2rem", "color": "var(--text-light)"}}>Cargando trabajos...</p> : <JobListings jobs={jobs} />   
          }
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          {total > 0 &&
              <p style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginBottom": "2rem", "color": "var(--text-light)"}}>
                  Mostrando {(currentPage - 1) * RESULTS_PER_PAGE + 1} -{' '}
                  {Math.min(currentPage * RESULTS_PER_PAGE, total)} de {total} trabajos
              </p>
          }
        </section>
    </main>
  )
}