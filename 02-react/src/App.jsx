import { useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import { SearchFormSection } from './components/SearchFormSection'
import { Pagination } from './components/Pagination'
import { JobListings } from './components/JobListings'
import jobsData from './data.json';

const RESULTS_PER_PAGE = 5

function App() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const jobsFilteredByFilters = jobsData.filter(job => {
    return (
      (filters.technology === '' || job.data.technology === filters.technology) &&
      (filters.location === '' || job.data.modalidad.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
    )
  })

  const jobsWithTextFilter = textToFilter === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    })

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (filters) => {
    setFilters({
      technology: filters.technology,
      location: filters.location,
      experienceLevel: filters.experienceLevel,
    })
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

  return (
    <>
      <Header />
      <main>
          <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} onReset={handleReset}/>
          <JobListings jobs={pagedResults} />   
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          <p style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginBottom": "2rem", "color": "var(--text-light)"}}>
              Mostrando {(currentPage - 1) * RESULTS_PER_PAGE + 1} -{' '}
              {Math.min(currentPage * RESULTS_PER_PAGE, jobsData.length)} de {jobsData.length} trabajos
          </p>
      </main>
      <Footer />
    </>
  )
}

export default App
