import { SkinsMongoRepo } from './skins.mongo.repo';
import { SkinModel } from './skins.mongo.model';

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
  });

  describe('When we instantiate it WITH Errors', () => {
    const exec = jest.fn().mockRejectedValue(new Error('Error'));
    beforeEach(() => {
      SkinModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
      repo = new SkinsMongoRepo();
    });

    test('Then it should execute by getById', async () => {
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});

