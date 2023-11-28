/* eslint-disable camelcase */
import { Schema, model } from 'mongoose';
import { Skin } from '../entities/skin.js';

const skinsSchema = new Schema<Skin>({
  name: {
    type: String,
    required: true,
  },
  rarity: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    publicId: String,
    size: Number,
    width: Number,
    height: Number,
    format: String,
    url: String,
  },
  collections_name: {
    type: String,
    required: true,
  },
  case_name: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

skinsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const SkinModel = model<Skin>('Skin', skinsSchema, 'skins');
