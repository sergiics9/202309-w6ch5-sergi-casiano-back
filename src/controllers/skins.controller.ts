import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Repository } from '../repos/repo.js';
import { Skin } from '../entities/skin.js';
import { Controller } from './controller.js';

const debug = createDebug('SKINS:skins:controller');

export class SkinsController extends Controller<Skin> {
  constructor(protected repo: Repository<Skin>) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = { id: req.body.userId };
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
