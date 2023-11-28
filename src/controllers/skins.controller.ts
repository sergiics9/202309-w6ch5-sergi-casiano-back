import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Skin } from '../entities/skin.js';
import { Controller } from './controller.js';
import { HttpError } from '../types/http.error.js';
import { SkinsMongoRepo } from '../repos/skins.mongo.repo.js';

const debug = createDebug('SKINS:skins:controller');

export class SkinsController extends Controller<Skin> {
  constructor(protected repo: SkinsMongoRepo) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = { id: req.body.userId };

      if (!req.file)
        throw new HttpError(406, 'Not Acceptable', 'Invalid multer file');
      const imgData = await this.cloudinaryService.uploadImage(req.file.path);
      req.body.image = imgData;
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
