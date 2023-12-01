import { ImgData } from '../types/img.data';
import { Skin } from './skin';

export type LoginUser = {
  email: string;
  passwd: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  avatar: ImgData;
  role: 'Admin' | 'User';
  skins: Skin[];
};
