import { Router as createRouter } from 'express';
import { SkinsController } from '../controllers/skins.controller.js';
import createDebug from 'debug';
import { SkinsMongoRepo } from '../repos/skins.mongo.repo.js';

const debug = createDebug('SKINS:skins:router');

export const skinsRouter = createRouter();
debug('Starting');

const repo = new SkinsMongoRepo();
const controller = new SkinsController(repo);

skinsRouter.get('/', controller.getAll.bind(controller));
skinsRouter.get('/:id', controller.getById.bind(controller));
skinsRouter.post('/', controller.create.bind(controller));
skinsRouter.patch('/:id', controller.update.bind(controller));
skinsRouter.delete('/:id', controller.delete.bind(controller));
