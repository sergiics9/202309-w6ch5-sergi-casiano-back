/* eslint-disable no-negated-condition */
import { Request, Response } from 'express';
import fs from 'fs/promises';
import { Skin } from '../model/skin';

const dataFilePath = './api/db.json';

const readDataFromFile = async (): Promise<Skin[]> => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data).skins as Skin[];
  } catch (error) {
    console.error('Error reading data file:', error);
    throw error;
  }
};

const writeDataToFile = async (data: Skin): Promise<void> => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data), 'utf8');
    console.log('Data successfully written to file.');
  } catch (error) {
    console.error('Error writing data to file:', error);
    throw error;
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const jsonData = await readDataFromFile();
  res.json(jsonData);
};

export const getById = async (req: Request, res: Response) => {
  const jsonData = await readDataFromFile();
  const result = jsonData.find(
    (item: { id: number }) => item.id === Number(req.params.id)
  );
  res.json(result);
};

export const create = (req: Request, res: Response) => {
  const result: Skin = { ...req.body, id: dataArray.length + 1 };
  dataArray.push(result);
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  const idToUpdate: number = Number(req.params.id);
  let result = dataArray.find((item: Skin) => item.id === idToUpdate) as Skin;

  if (result) {
    result = { ...result, ...req.body };
    dataArray[dataArray.findIndex((item: Skin) => item.id === idToUpdate)] =
      result;
    res.json(result);
  } else {
    res.status(404).json({ error: 'Elemento no encontrado' });
  }
};

export const remove = (req: Request, res: Response) => {
  const idToRemove: number = Number(req.params.id);
  const indexToRemove = dataArray.findIndex(
    (item: Skin) => item.id === idToRemove
  );

  if (indexToRemove !== -1) {
    dataArray.splice(indexToRemove, 1);
    res.json({});
  } else {
    res.status(404).json({ error: 'Elemento no encontrado' });
  }
};
