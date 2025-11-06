import { useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import { SearchFormSection } from './components/SearchFormSection'
import { Pagination } from './components/Pagination'
import { JobListings } from './components/JobListings'
import jobsData from './data.json';

const RESULTS_PER_PAGE = 5

function App() {

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)

  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main>
          <SearchFormSection  />
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
