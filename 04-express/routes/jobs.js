import { Router } from 'express';
import { JobController } from '../controllers/jobs.js';


const jobsRouter = Router();

jobsRouter.get('/', JobController.getJobs);
jobsRouter.get('/:id', JobController.getId);

// No es Idempotente
jobsRouter.post('/', JobController.createJob);
// Para actualizaciones parciales
jobsRouter.patch('/:id', JobController.partialUpdate)
jobsRouter.delete('/:id', JobController.delete)

export { jobsRouter }