import * as mongoose from 'mongoose';
import { Cat } from 'src/cats/interface/cats.interface';
const Schema = mongoose.Schema;

export const humanSchema = new mongoose.Schema({
  catId: {
    type: Schema.Types.ObjectId,
    ref: Cat,
  },
  name: String,
  gender: String,
  catsCount: Number,
});
