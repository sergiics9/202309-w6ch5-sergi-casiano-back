import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../controllers/skins.controller.js';

export const thingsRouter = createRouter();

thingsRouter.get('/', getAll);
thingsRouter.get('/:id', getById);
thingsRouter.post('/', create);
thingsRouter.patch('/:id', update);
thingsRouter.delete('/:id', remove);
