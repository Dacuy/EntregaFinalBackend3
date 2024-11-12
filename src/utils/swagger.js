import {dirname} from 'path'
import __dirname from '../utils.js';
export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de nuestros endpoint de adoptame',
            description: 'Api pensada para los endpoint de adoptame'
        }
    },
    apis: [`${dirname(__dirname)}/src/docs/**/*.yaml`]
};


