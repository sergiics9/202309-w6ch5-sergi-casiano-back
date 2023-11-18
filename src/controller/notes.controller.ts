/* eslint-disable no-negated-condition */
import { Request, Response } from 'express';
import fs from 'fs';
import { Thing } from '../model/thing';

const dataFilePath = './api/db.json';
export let dataArray: Thing[] = [];

try {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  dataArray = JSON.parse(rawData).things || [];
} catch (error) {
  console.error('Error al leer el archivo db.json:', error);
}

export const getAll = (_req: Request, res: Response) => {
  res.json(dataArray);
};

export const getById = (req: Request, res: Response) => {
  const result = dataArray.find((item) => item.id === Number(req.params.id));
  res.json(result);
};

export const create = (req: Request, res: Response) => {
  const result: Thing = { ...req.body, id: dataArray.length + 1 };
  dataArray.push(result);
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  const idToUpdate: number = Number(req.params.id);
  let result = dataArray.find((item: Thing) => item.id === idToUpdate) as Thing;

  if (result) {
    result = { ...result, ...req.body };
    dataArray[dataArray.findIndex((item: Thing) => item.id === idToUpdate)] =
      result;
    res.json(result);
  } else {
    res.status(404).json({ error: 'Elemento no encontrado' });
  }
};

export const remove = (req: Request, res: Response) => {
  const idToRemove: number = Number(req.params.id);
  const indexToRemove = dataArray.findIndex(
    (item: Thing) => item.id === idToRemove
  );

  if (indexToRemove !== -1) {
    dataArray.splice(indexToRemove, 1);
    res.json({});
  } else {
    res.status(404).json({ error: 'Elemento no encontrado' });
  }
};
