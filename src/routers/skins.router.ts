import { Router as createRouter } from 'express';
import { SkinsController } from '../controllers/skins.controller.js';
import createDebug from 'debug';
import { SkinsMongoRepo } from '../repos/skins.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('SKINS:skins:router');

export const skinsRouter = createRouter();
debug('Starting');

const repo = new SkinsMongoRepo();
const controller = new SkinsController(repo);
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();

skinsRouter.get(
  '/',
  // Interceptor.authorization.bind(interceptor),
  controller.getAll.bind(controller)
);
skinsRouter.get('/search', controller.search.bind(controller));
skinsRouter.get('/:id', controller.getById.bind(controller));
skinsRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  fileInterceptor.singleFileStore('image').bind(fileInterceptor),
  // FileInterceptor.singleFileStore('collections_image').bind(fileInterceptor),
  // fileInterceptor.singleFileStore('case_image').bind(fileInterceptor),

  controller.create.bind(controller)
);
skinsRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationSkins.bind(interceptor),
  controller.update.bind(controller)
);
skinsRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationSkins.bind(interceptor),
  controller.delete.bind(controller)
);
