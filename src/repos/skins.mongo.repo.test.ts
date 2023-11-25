import { SkinsMongoRepo } from './skins.mongo.repo';
import { SkinModel } from './skins.mongo.model.js';
import { Skin } from '../entities/skin';
import { UsersMongoRepo } from './users.mongo.repo';

jest.mock('./skins.mongo.model.js');

describe('Given SkinsMongoRepo', () => {
  let repo: SkinsMongoRepo;
  describe('When we instantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue('Test');
    beforeEach(() => {
      SkinModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      SkinModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      SkinModel.create = jest.fn().mockResolvedValue('Test');
      repo = new SkinsMongoRepo();
    });

    test('Then it should execute getAll', async () => {
      const result = await repo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute getById', async () => {
      const result = await repo.getById('');
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute search', async () => {
      const result = await repo.search({ key: 'rarity', value: true });
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute create', async () => {
      UsersMongoRepo.prototype.getById = jest.fn().mockResolvedValue({
        skins: [],
      });
      UsersMongoRepo.prototype.update = jest.fn();
      const result = await repo.create({ author: {} } as Omit<Skin, 'id'>);
      expect(result).toBe('Test');
    });
  });

  describe('When we instantiate it WITH errors', () => {
    const exec = jest.fn().mockRejectedValue(new Error('Test'));
    beforeEach(() => {
      SkinModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
      repo = new SkinsMongoRepo();
    });

    test('Then it should execute getById', async () => {
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});
