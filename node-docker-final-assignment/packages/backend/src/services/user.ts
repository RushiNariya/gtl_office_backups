/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '@app/backend/src/models/user';
import { Document, Query } from 'mongoose';
import Logger from '@app/lib/src/logger';
import IUserSchema from '../interfaces/IUserSchema';

const logger: Logger = new Logger('Controller', 'user.js');

const getAll = async (): Promise<(IUserSchema & Document<IUserSchema>)[]> => {
  try {
    return await User.find();
  }
  catch (err: unknown) {
    throw new Error(`getAll Err: ${err}`);
  }
};

const createOne = async (data: IUserSchema & Document<IUserSchema>): Promise<null> => {
  try {
    await User.create(data);

    return null;
  }
  catch (err: unknown) {
    throw new Error(`createOne Err: ${err}`);
  }
};

const findByEmail = async (email: { email: string }): Promise<(IUserSchema & Document<IUserSchema>)[]> => {
  try {
    const users: (IUserSchema & Document<IUserSchema>)[] = await User.find(email);

    return users;
  }
  catch (err: unknown) {
    throw new Error(`findByEmail Err: ${err}`);
  }
};

const findById = async (id:string): Promise<IUserSchema & Document<IUserSchema>> => {
  try {
    const user: IUserSchema & Document<IUserSchema> = await User.findById(id);

    return user;
  }
  catch (err: unknown) {
    throw new Error(`findById Err: ${err}`);
  }
};

const deleteById = async (id: string): Promise<IUserSchema & Document<IUserSchema>> => {
  try {
    const user: IUserSchema & Document<IUserSchema> = await User.findByIdAndDelete({ _id: id, active: false });

    return user;
  }
  catch (err: unknown) {
    throw new Error(`deleteById Err: ${err}`);
  }
};

const queryFilterSort = async (q: any): Promise<(IUserSchema & Document<IUserSchema>)[]>  => {
  const queryCopyObj: any = { ...q };

  delete queryCopyObj.sort;

  const queryStr: string = JSON.stringify(queryCopyObj);
  const replaceQueryStr: string = queryStr.replace(/\b(gt|lt|lte|gte)\b/g, (m) => `$${m}`);

  try {
    let query: Query<(IUserSchema & Document<IUserSchema>)[], IUserSchema & Document<IUserSchema>> = User.find(JSON.parse(replaceQueryStr));
    if (q.sort) {
      query = query.sort(q.sort);
    }

    return await query;
  }
  catch (err: unknown) {
    throw new Error(`getAll Err: ${err}`);
  }
};

const putImage = async (id: string, img: any): Promise<IUserSchema & Document<IUserSchema>> => {
  try {
    const user: IUserSchema & Document<IUserSchema> = await User.findByIdAndUpdate(id, { img });

    return user;
  }
  catch (err: unknown) {
    throw new Error(`getAll Err: ${err}`);
  }
};

const register = async (data: IUserSchema & Document<IUserSchema>): Promise<null> => {
  await createOne(data);

  return null;
};

const login = async (body: any): Promise<(IUserSchema & Document<IUserSchema>)[] | boolean> => {
  const data = { ...body };
  try {
    const users: (IUserSchema & Document<IUserSchema>)[] = await findByEmail({ email: data.email });

    return users;
  }
  catch (err: unknown) {
    logger.error(err);
    // eslint-disable-next-line newline-before-return
    return false;
  }
};

export {
  getAll,
  createOne,
  findByEmail,
  findById,
  deleteById,
  queryFilterSort,
  putImage,
  register,
  login
};