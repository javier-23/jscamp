import { error } from 'node:console';
import { createServer} from 'node:http';

process.loadEnvFile()

const port = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
}

const users = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
];

const server = createServer((req, res) => {
    const {method, url} = req;

    if(method === 'GET'){
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        if(req.url === '/'){
            return res.end('¡Hola, mundo!');
        }
        if(req.url === '/users'){
            return sendJson(res, 200, users);
        }

        if(req.url === '/health'){
            return sendJson(res, 200, {status: 'ok', uptime: process.uptime()});
        }
    }

    if (method === 'POST'){
        if(url === '/users'){
            
        }
    }

    return sendJson(res, 404, {
        error: 'Not Found',
        message: 'La ruta solicitada no existe en este servidor',
    })
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});