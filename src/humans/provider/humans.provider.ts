import { Connection } from 'mongoose';
import { humanSchema } from '../schema/human.schema';

export const humanProvider = [
  {
    provide: 'HUMAN_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Room', humanSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
