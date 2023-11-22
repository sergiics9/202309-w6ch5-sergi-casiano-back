import { User } from './user';

export type Skin = {
  id: string;
  name: string;
  rarity: string;
  description: string;
  image: string;
  collections_name: string;
  collections_image: string;
  case_image: string;
  case_name: string;
  author: User;
};
