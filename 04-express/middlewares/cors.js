import cors from 'cors';

const ACCEPTED_ORIGINS = ['http://localhost:5173'];

// Middleware para habilitar CORS (origenes distintos))
export const corsMiddleware = ({ acceptedOrigin = ACCEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => { // 
        if(!origin || acceptedOrigin.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origen no permitido por CORS'));
        }
    })
}
