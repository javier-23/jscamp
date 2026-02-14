
// MODELO: Lógica de datos, comunicación con la base de datos. No HTTP
import jobs from '../data/jobs.json' with { type: 'json' };

export class JobModel {
    static async getAll({text, title, level, limit = 10, technology, offset = 0}) {
        let filteredJobs = jobs;

        if (text) {
            const searchTerm = text.toLowerCase()
            filteredJobs = filteredJobs.filter(job => 
            job.titulo?.toLowerCase().includes(searchTerm) ||
            job.descripcion?.toLowerCase().includes(searchTerm)
            );
        }

        const limitNumber = Number(limit);
        const offsetNumber = Number(offset);

        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);
        
        return {paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber};
    }

    static async getById(id) {
        const job = jobs.find(job => job.id === id);
        return job;
    }

    static async create({ titulo, empresa, ubicacion, data }) {
        const newJob = {
            id: jobs.length + 1,
            title: titulo,
            company: empresa,
            location: ubicacion,
            description: data
        };
        jobs.push(newJob);
        return newJob;
    }

    static async delete(id) {
        // Filtramos el array para eliminar el elemento
        jobs = jobs.filter(job => job.id !== Number(id))
    }

    static async partialUpdate(id, { title }) {
        const jobIndex = jobs.findIndex(job => job.id === Number(id))
        
        if (jobIndex === -1) return res.status(404).json({ message: 'No existe' })

        // Actualizamos solo el campo title
        jobs[jobIndex] = {
            ...jobs[jobIndex],
            title
        }
    }
}