// CONTROLADOR: intermediario. Recibe petición del cliente, llama al modelo para obtener los datos y decide qué enviar.

import { JobModel } from '../models/job.js';
import { DEFAULTS } from '../config.js';

export class JobController{
    static async getJobs(req, res){
        const {text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET} = req.query;
        
        const {paginatedJobs, total, limit: limitNumber, offset: offsetNumber} = await JobModel.getAll({text, title, level, limit, technology, offset});

        return res.json({data: paginatedJobs, total, limit: limitNumber, offset: offsetNumber});
    }

    // Estático y así no necesito instanciar la clase para usar el método
    // y asíncrono por si algun día quiero hacer una consulta a una base de datos o a otro servicio externo
    static async getId(req, res){
        const { id } = req.params;

        const job = await JobModel.getById(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        return res.json({
            job
        });
    }

    static async createJob(req, res){
        const { titulo, empresa, ubicacion, data } = req.body;

        const newJob = await JobModel.create({ titulo, empresa, ubicacion, data });

        res.status(201).json(newJob);
    }

    static async update(req, res){
    
    }

    static async partialUpdate(req, res){
        const { id } = req.params
        const { title } = req.body

        await JobModel.partialUpdate(id, { title })

        return res.json({ message: 'Job updated successfully' })
    }

    static async delete(req, res){
        const { id } = req.params

        await JobModel.delete(id)

        // Respondemos con 204 (Éxito sin contenido)
        return res.status(204).send()
    }

}      

