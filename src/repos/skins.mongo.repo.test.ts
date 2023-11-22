import { Skin } from '../entities/skin.js';
import { SkinsMongoRepo } from './skins.mongo.repo.js';
import { HttpError } from '../types/http.error.js';
import { SkinModel } from './skins.mongo.model.js';

jest.mock('./skins.mongo.model.js');

describe('Given SkinsMongoRepo class', () => {
  let mockId: string;
  let mockName: string;
  let mockData: Partial<Skin>[];

  beforeEach(() => {
    mockId = '1';
    mockName = 'AWP | Dragon Lore';
    mockData = [{ id: mockId, name: mockName }];

    (SkinModel.find as jest.Mock).mockResolvedValue(mockData);
    (SkinModel.findById as jest.Mock).mockResolvedValue(mockData[0]);
    (SkinModel.create as jest.Mock).mockResolvedValue(mockData[0]);
    (SkinModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockData[0]);
    (SkinModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockData[0]);
  });

  describe('When we instantiate it without errors', () => {
    test('Then getAll should return the list of Skins', async () => {
      const repo = new SkinsMongoRepo();
      const result = await repo.getAll();
      expect(result).toEqual(mockData);
    });

    test('Then getById should return the Skin with the specified id', async () => {
      const repo = new SkinsMongoRepo();
      const result = await repo.getById(mockId);
      expect(result).toEqual(mockData[0]);
    });

    test('Then getById should throw HttpError for non-existent id', async () => {
      const repo = new SkinsMongoRepo();
      const nonExistentId = 'non-existent-id';
      (SkinModel.findById as jest.Mock).mockResolvedValue(null);
      await expect(repo.getById(nonExistentId)).rejects.toThrow(HttpError);
    });

    test('Then create should add a new Skin and return it', async () => {
      const repo = new SkinsMongoRepo();
      const newSkin = { name: mockName } as Omit<Skin, 'id'>;
      const result = await repo.create(newSkin);
      expect(result).toEqual(mockData[0]);
    });

    test('Then update should modify an existing Skin and return it', async () => {
      const repo = new SkinsMongoRepo();
      const updatedSkin = { name: mockName };
      const result = await repo.update(mockId, updatedSkin);
      expect(result).toStrictEqual({
        id: mockId,
        name: mockName,
      });
    });

    test('Then update should throw HttpError for non-existent id', async () => {
      const repo = new SkinsMongoRepo();
      const nonExistentId = 'non-existent-id';
      (SkinModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      await expect(repo.update(nonExistentId, {})).rejects.toThrow(HttpError);
    });

    test('Then delete should remove an existing Skin', async () => {
      const repo = new SkinsMongoRepo();
      await repo.delete(mockId);
    });

    test('Then delete should throw HttpError for non-existent id', async () => {
      const repo = new SkinsMongoRepo();
      const nonExistentId = 'non-existent-id';
      (SkinModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      await expect(repo.delete(nonExistentId)).rejects.toThrow(HttpError);
    });
  });
});
