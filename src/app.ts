import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { thingsRouter } from './routers/skins.router.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.get('/', (_req: Request, res: Response) => {
  res.json('Respuesta al Get');
});

app.use('/skins', thingsRouter);
