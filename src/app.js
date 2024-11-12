import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import mocksRouter from './routes/mocks.router.js';
import errorHandler from './middlewares/errorHandler.js';

import usersRouter from './routes/usuarios.router.js';
import petsRouter from './routes/mascotas.router.js';
import adoptionsRouter from './routes/adopciones.router.js';
import sessionsRouter from './routes/sessions.router.js';
import config from './config/config.js';
import __dirname from './utils.js';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './utils/swagger.js';
const specs = swaggerJsDoc(swaggerOptions);

const app = express();
const PORT = config.app.PORT;
const MONGO_URI = config.mongo.URL;
const PUBLIC_DIR = `${__dirname}/public`;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error conectando con mongo', err));

// MIDDLEWARES
app.use(express.static(PUBLIC_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// RUTAS GENERALES
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use(errorHandler);

export default app;
