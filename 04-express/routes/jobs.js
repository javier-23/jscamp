import { Router } from 'express';
import { JobController } from '../controllers/jobs.js';
import { validateJob, validatePartialJob } from '../schemas/jobs.js';

const jobsRouter = Router();

function validateCreate(req, res, next) {
    const result = validateJob(req.body)
    if (result.success) {
        req.body = result.data
        next()
    }

    return res.status(400).json({
        error: 'Invalid request',
        details: result.error.errors    
    })
}

function validateUpdate(req, res, next) {
    const result = validatePartialJob(req.body)
    if (result.success) {
        req.body = result.data
        next()
    }

    return res.status(400).json({
        error: 'Invalid request',
        details: result.error.errors    
    })
}


jobsRouter.get('/', JobController.getJobs);
jobsRouter.get('/:id', JobController.getId);

// No es Idempotente
jobsRouter.post('/',validateCreate, JobController.createJob);
// Para actualizaciones parciales
jobsRouter.patch('/:id', validateUpdate,JobController.partialUpdate)
jobsRouter.delete('/:id', JobController.delete)

export { jobsRouter }