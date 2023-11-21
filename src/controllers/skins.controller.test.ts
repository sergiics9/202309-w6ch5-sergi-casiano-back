import { NextFunction, Request, Response } from 'express';
import { SkinsController } from './skins.controller';
import { SkinsFileRepo } from '../repos/skins.file.repo';

describe('Given FilmsController class', () => {
  describe('When we instantiate it', () => {
    const mockData = [{}];
    SkinsFileRepo.prototype.getAll = jest.fn().mockResolvedValue(mockData);

    const controller = new SkinsController();

    const mockRequest: Request = {
      body: {},
    } as Request;

    const mockResponse: Response = {
      json: jest.fn(),
    } as unknown as Response;

    const mockId = '1';

    test('Then getAll should return the correct data', async () => {
      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
    test('Then getById should return the correct data when valid id is provided', async () => {
      const mockResult = { id: mockId, name: 'Godzilla' };
      SkinsFileRepo.prototype.getById = jest.fn().mockResolvedValue(mockResult);

      const controller = new SkinsController();

      const mockRequest: Request = {
        params: { id: mockId },
      } as unknown as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      const mockNext: NextFunction = {
        next: jest.fn(),
      } as unknown as NextFunction;

      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });
    test('Then create method should create a new film and return 201 status with correct data', async () => {
      const mockRequestBody = {
        name: 'El castillo de Godzilla',
        director: 'Takeshi Kitano',
      };
      const mockCreatedResult = {
        id: mockId,
        name: 'El castillo de Godzilla',
        director: 'Takeshi Kitano',
      };
      SkinsFileRepo.prototype.create = jest
        .fn()
        .mockResolvedValue(mockCreatedResult);

      const controller = new SkinsController();

      const mockRequest: Request = {
        body: mockRequestBody,
      } as Request;

      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        statusMessage: '',
        json: jest.fn(),
      } as unknown as Response;

      await controller.create(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.statusMessage).toBe('Created');
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedResult);
    });
    test('The update method should update a film and return the updated data', async () => {
      const mockRequestBody = {
        name: 'Godzilla y Filemón',
        director: 'Santiago Segura',
      };
      const mockUpdatedResult = {
        id: mockId,
        name: 'Godzilla y Filemón',
        director: 'Santiago Segura',
      };
      SkinsFileRepo.prototype.update = jest
        .fn()
        .mockResolvedValue(mockUpdatedResult);

      const controller = new SkinsController();

      const mockRequest: Request = {
        params: { id: mockId },
        body: mockRequestBody,
      } as unknown as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await controller.update(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedResult);

      expect(SkinsFileRepo.prototype.update).toHaveBeenCalledWith(
        mockId,
        mockRequestBody
      );
    });
    test('The method should delete a film and return 204 status with no content', async () => {
      SkinsFileRepo.prototype.delete = jest.fn().mockResolvedValue(undefined);

      const controller = new SkinsController();

      const mockRequest: Request = {
        params: { id: mockId },
      } as unknown as Request;

      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        statusMessage: '',
        json: jest.fn(),
      } as unknown as Response;

      const mockNext: NextFunction = {
        next: jest.fn(),
      } as unknown as NextFunction;

      await controller.delete(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.statusMessage).toBe('No Content');
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
    test('Then getById should handle errors and call next with the error', async () => {
      const mockError = new Error('Mock error');
      SkinsFileRepo.prototype.getById = jest.fn().mockRejectedValue(mockError);

      const controller = new SkinsController();

      const mockRequest: Request = {
        params: { id: '1' },
      } as unknown as Request;

      const mockResponse: Response = {} as unknown as Response;

      const mockNext: NextFunction = jest.fn();

      await controller.getById(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    test('The delete method should handle errors and call next with the error', async () => {
      const mockError = new Error('Mock error');
      SkinsFileRepo.prototype.delete = jest.fn().mockRejectedValue(mockError);

      const controller = new SkinsController();

      const mockRequest: Request = {
        params: { id: '1' },
      } as unknown as Request;

      const mockResponse: Response = {} as unknown as Response;

      const mockNext: NextFunction = jest.fn();

      await controller.delete(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
