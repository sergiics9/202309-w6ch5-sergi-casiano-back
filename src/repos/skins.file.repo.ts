import fs from 'fs/promises';
import { Skin } from '../entities/skin.js';
import { Repository } from './repo.js';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('SKINS:skins:file:repo');

export class SkinsFileRepo implements Repository<Skin> {
  file: string;
  skins: Skin[];
  constructor() {
    debug('Instantiated');
    this.file = './api/db.json';
    this.skins = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.skins = JSON.parse(data);
  }

  async getAll(): Promise<Skin[]> {
    return this.skins;
  }

  async getById(id: string): Promise<Skin> {
    const result = this.skins.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  // Search({ _key, _value }: { _key: string; _value: unknown }): Promise<Skin[]> {
  //   // Temp this.skins.find((item) => item[_key] === _value)
  //   // throw new Error('Method not implemented.');
  // }
  async create(newItem: Omit<Skin, 'id'>): Promise<Skin> {
    const result: Skin = { ...newItem, id: (this.skins.length + 1).toString() };
    const newTasks = [...this.skins, result];
    await this.save(newTasks as Skin[]);
    return result;
  }

  async update(id: string, updatedItem: Partial<Skin>): Promise<Skin> {
    let result = this.skins.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    result = { ...result, ...updatedItem } as Skin;
    const newTasks = this.skins.map((item) => (item.id === id ? result : item));
    await this.save(newTasks as Skin[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newTasks = this.skins.filter((item) => item.id !== id);
    if (newTasks.length === this.skins.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newTasks);
  }

  private async save(newSkins: Skin[]) {
    await fs.writeFile(this.file, JSON.stringify(newSkins), {
      encoding: 'utf-8',
    });
    this.skins = newSkins;
  }
}
