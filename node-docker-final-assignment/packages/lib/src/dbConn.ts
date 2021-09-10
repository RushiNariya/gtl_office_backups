import { connect } from 'mongoose';
import { config } from './config';

export default async (): Promise<typeof import('mongoose')> => {
  try {
    const conn: typeof import('mongoose') = await connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    return conn;
  }
  catch (err) {
    throw new Error(`MongoDB connection err: ${err}`);
  }
};
