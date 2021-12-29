import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});
