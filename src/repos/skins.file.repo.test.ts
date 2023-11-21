import { Skin } from '../entities/skin';
import { HttpError } from '../types/http.error';
import { SkinsFileRepo } from './skins.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given SkinsFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"id": "1", "name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();

    const repo = new SkinsFileRepo();
    const mockId = '1';
    test('Then getAll should return the list of skins', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });
    test('Then getById should return the skin with the specified id', async () => {
      const result = await repo.getById(mockId);
      const expectedSkin = JSON.parse(mockData).find(
        (skin: Skin) => skin.id === mockId
      );
      expect(result).toEqual(expectedSkin);
    });
    test('Then create should add a new skin and return it', async () => {
      const mockData = '[]';
      const mockName = 'AWP | Dragon Lore';
      fs.readFile = jest.fn().mockResolvedValue(mockData);
      const repo = new SkinsFileRepo();

      const newSkin = { name: mockName } as Omit<Skin, 'id'>;
      const result = await repo.create(newSkin);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', mockName);

      const updatedData = await repo.getAll();
      expect(updatedData).toHaveLength(1);
      expect(updatedData[0]).toEqual(result);
    });
    test('Then update should modify an existing skin and return it', async () => {
      const mockName = 'M9 Bayonet | Doppler';
      const updatedSkin = { name: mockName };
      const result = await repo.update(mockId, updatedSkin);

      const expectedSkin = { id: mockId, name: mockName };
      const updatedData = await repo.getAll();

      expect(result).toEqual(expectedSkin);
      expect(updatedData).toHaveLength(1);
      expect(updatedData[0]).toEqual(result);
    });
    test('Then delete should remove an existing skin', async () => {
      await repo.delete(mockId);
      const updatedData = await repo.getAll();
      expect(updatedData).toHaveLength(0);
    });
    test('Then delete should throw HttpError for non-existent id', async () => {
      const nonExistentId = 'non-existent-id';
      await expect(repo.delete(nonExistentId)).rejects.toThrow(HttpError);
    });
  });
});
