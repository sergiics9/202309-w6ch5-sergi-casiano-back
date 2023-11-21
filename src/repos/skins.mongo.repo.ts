import { Skin } from '../entities/skin';
import { SkinModel } from './skins.mongo.model.js';
import { Repository } from './repo.js';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('SKINS:skins:mongo:repo');

export class SkinsMongoRepo implements Repository<Skin> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Skin[]> {
    const result = await SkinModel.find();
    return result;
  }

  async getById(id: string): Promise<Skin> {
    const result = await SkinModel.findById(id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  search({ _key, _value }: { _key: string; _value: unknown }): Promise<Skin[]> {
    // Temp this.Skins.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  async create(newItem: Omit<Skin, 'id'>): Promise<Skin> {
    const result: Skin = await SkinModel.create(newItem);
    return result;
  }

  async update(id: string, updatedItem: Partial<Skin>): Promise<Skin> {
    const result = await SkinModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await SkinModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
