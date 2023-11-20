import { Router as createRouter } from 'express';
import { SkinsController } from '../controllers/skins.controller.js';
import createDebug from 'debug';

const debug = createDebug('SKINS:films:router');

export const filmsRouter = createRouter();
debug('Starting');

const controller = new SkinsController();

filmsRouter.get('/', controller.getAll.bind(controller));
filmsRouter.get('/search', controller.search.bind(controller));
filmsRouter.get('/:id', controller.getById.bind(controller));
filmsRouter.post('/', controller.create.bind(controller));
filmsRouter.patch('/:id', controller.update.bind(controller));
filmsRouter.patch('addUser/:id', controller.update.bind(controller));
filmsRouter.patch('removeUser/:id', controller.update.bind(controller));
filmsRouter.delete('/:id', controller.delete.bind(controller));
