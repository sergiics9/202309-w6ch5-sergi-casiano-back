import { Request, Response } from 'express';
import { SkinsController } from './skins.controller';
import { SkinsFileRepo } from '../repos/skins.file.repo';

describe('Given TasksController class', () => {
  describe('When we instantiate it', () => {
    test('Then getAll should ...', async () => {
      SkinsFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);

      const controller = new SkinsController();

      const mockRequest: Request = {
        body: {},
      } as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });
  });
});
