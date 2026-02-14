import { test, describe, before, after } from 'node:test'
import assert from 'assert'
import app from './app.js'

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
    const res = await fetch(`${BASE_URL}/jobs`)

    assert.strictEqual(res.status, 200) // Igualdad estricta, no solo el valor sino también el tipo
    assert.equal(res.headers.get('content-type')?.includes('application/json'), true)

    const json = await res.json()
    // Exige el valor correcto y deja mensaje
    assert.ok(Array.isArray(json.data), "La respuesta debe ser un array en json.data")
  })
})