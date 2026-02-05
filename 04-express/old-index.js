import express from 'express'
import { DEFAULTS } from './config.js';

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express()

// Middleware que se ejecuta en todas las peticiones
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Ejecutando middleware global`);
  next();
});

const previousHomeMiddleware = (request, response) => {
  response.send('Ejecutando middleware previo a ruta /');
}

app.get('/', previousHomeMiddleware, (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime()
  });
});

app.get('/jobs',async (req, res) => {
  const { default: jobs } = await import ('./jobs.json', { with: { type: 'json' } });
  let filteredJobs = jobs;

  const {text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET} = req.query;
  if (text) {
    const searchTerm = text.toLowerCase()
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm)
    );
  }

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);

  const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

  res.json(paginatedJobs);
})

app.get('/jobs/:id', (req, res) => {
  const { id } = req.params;

  const idNumber = Number(id);

  return res.json({
    job: { id: idNumber, title: `Job Title for ID ${idNumber}` }
  });
})

// Ruta opcional -> /acd o /abcd
app.get('/a{b}cd', (req, res) => {
  res.send('Ruta con "a" opcional');
})

// Comodín
app.get('/ab*cd', (req, res) => {
  res.send('Ruta con comodín');
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});