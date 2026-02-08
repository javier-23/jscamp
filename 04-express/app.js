// Punto de entrada. Patrón MVC
import express from 'express'
import { DEFAULTS } from './config.js';
import { corsMiddleware } from './middlewares/cors.js';
import { jobsRouter } from './routes/jobs.js';

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express()

app.use(corsMiddleware()); // Middleware para habilitar CORS
app.use(express.json()); // Middleware para parsear JSON

app.use('/jobs', jobsRouter);

if(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
