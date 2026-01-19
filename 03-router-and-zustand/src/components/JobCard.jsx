import { useState } from "react"
import { Link } from "../components/Link.jsx"
import styles from "./JobCard.module.css"
import { useFavoritesStore } from "../store/favoritesStore.js"

function JobCardFavoriteButton({ jobId }) {
    const {toogleFavorite, isFavorite} = useFavoritesStore()
    
    return (
        <button 
            onClick={(e) => {
                e.stopPropagation()
                toogleFavorite(jobId)
            }}
            aria-label={isFavorite(jobId) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
            {isFavorite(jobId) ? '❤️' : '🤍'}
        </button>
    )
}

export function JobCard({job}){

    const [isApplied, setIsApplied] = useState(false)

    const handleApplyClick = (e) => {
        e.stopPropagation() // Evitar que el click en el botón se propague al enlace padre
        setIsApplied(true)
    }

    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'
    
    return (
        <article 
            className="job-listing-card" 
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
            data-technology={job.data.technology}
        >
            <Link
                href={`/jobs/${job.id}`} 
                className={styles.cardLink}
                aria-label={`Ver detalles del trabajo: ${job.titulo} en ${job.empresa}`}
            >
                <div>
                    <h3>
                        {job.titulo}
                    </h3>
                    <small>{job.empresa} | {job.ubicacion}</small>
                    <p>{job.descripcion}</p>
                </div>
            </Link>
            <button className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
            <JobCardFavoriteButton jobId={job.id} />
        </article>
    )    
}