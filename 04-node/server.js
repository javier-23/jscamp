import { createServer} from 'node:http';
import { json } from 'node:stream/consumers';
import { randomUUID } from 'node:crypto';

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

const server = createServer(async (req, res) => {
    const {method, url} = req;

    const [pathname, querystring] = url.split('?')

    const searchParams = new URLSearchParams(querystring);

    if(method === 'GET'){
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        if(pathname === '/'){
            return res.end('¡Hola, mundo!');
        }
        if(pathname === '/users'){
            const limit = Number(searchParams.get('limit')) || users.length;
            const offset = Number(searchParams.get('offset')) || 0;

            const paginatedUsers = users.slice(offset, offset + limit);

            return sendJson(res, 200, paginatedUsers);
        }

        if(pathname === '/health'){
            return sendJson(res, 200, {status: 'ok', uptime: process.uptime()});
        }
    }

    if (method === 'POST'){
        if(pathname === '/users'){
            const body = await json(req);
            
            if(!body || !body.name){
                return sendJson(res, 400, {error: 'Bad Request', message: 'El campo "name" es obligatorio'});
            }

            const newUser = {
                name: body.name,
                id: randomUUID(),
            }

            users.push(newUser);

            return sendJson(res, 201, {message: 'Usuario creado exitosamente'});
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