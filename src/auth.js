import jwt from 'jsonwebtoken';
import config from './config.js' // Asegúrate de tener la clave secreta en config

export const CreateAccessToken = (user) => {
    // Generar el token con el ID del usuario como payload
    return jwt.sign(
        { id: user.id }, // El payload, puedes incluir más datos si es necesario
        config.token_key, // Clave secreta tomada de .env
        { expiresIn: '1h' } // Tiempo de expiración del token
    );
};