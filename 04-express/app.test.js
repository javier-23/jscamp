import { test, describe, befor, after } from 'node:test'
import assert from 'assert'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

// Antes de que se ejecuten todos los test, una vez para levantar el servidor
before(async () => {
    return new Promise((resolve, reject) => { // Promesas porque el servidor no se levanta y cierra instantáneamente, y los test tienen que esperar a que esté listo
        server = app.listen(PORT, () => resolve())  
        server.on('error', reject)
    })
});

// Después de los test, se ejecuta una vez para cerrar el servidor y Puerto
after(async () => {
    return new Promise((resolve, reject) => {
        server.close( (err) => {
            if (err) reject(err);
            else resolve();
        });
    })
});

describe('GET /jobs', () => {
  test('debería devolver un JSON con los trabajos', async () => {
    const res = await fetch(`${baseURL}/jobs`)

    assert.equal(res.status, 200)
    assert.equal(res.headers.get('content-type')?.includes('application/json'), true)

    const data = await res.json()
    assert.equal(Array.isArray(data), true)
  })
})