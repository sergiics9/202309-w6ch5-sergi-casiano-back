import { SkinsFileRepo } from './skins.file.repo';
import fs from 'fs/promises';
import { Skin } from '../entities/skin';

jest.mock('fs/promises');

describe('Given TasksFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"id": "1", "name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();
    const repo = new SkinsFileRepo();

    test('Then getAll should ...', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });

    test('Then getbyID should return the correct skin with its ID', async () => {
      const mockID = '1';
      const result = await repo.getById(mockID);
      const expectedSkin = JSON.parse(mockData).find(
        (skin: Skin) => skin.id === mockID
      );
      expect(result).toEqual(expectedSkin);
    });

    test('Then create it should add a new skin and return it', async () => {
      const mockData = '[]';
      fs.readFile = jest.fn().mockResolvedValue(mockData);
      const repo = new SkinsFileRepo();

      const newItem = { name: 'New Skin' } as Omit<Skin, 'id'>;
      const result = await repo.create(newItem);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', 'New Skin');

      const updatedData = await repo.getAll();
      expect(updatedData).toHaveLength(1);
      expect(updatedData[0]).toEqual(result);
    });
  });
});
