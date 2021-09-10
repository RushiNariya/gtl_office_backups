import {
  getAll,
  createOne,
  findById,
  queryFilterSort,
  deleteById,
  putImage,
  login,
  register,
} from '@app/backend/src/services/user';
import * as jwt from 'jsonwebtoken';

import Logger from '@app/lib/src/logger';
import { getHash } from '@app/lib/src/password';
import IUserSchema from '../interfaces/IUserSchema';
import { UploadedFile } from 'express-fileupload';
import IRequest from '../interfaces/IRequest';
import IResType from '../interfaces/IResType';
import { Document } from 'mongoose';
import { Request, Response } from 'express';
import { ExpressUploadRequest } from '../interfaces/ExpressUploadRequest';
import IError from '../interfaces/IError';

const logger: Logger = new Logger('Routes', 'user.js');

const getUser = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  logger.debug('User GET All');

  try {
    if (req?.query) {
      const keys: string[] = Object.keys(req.query);
      if (keys.length) {
        logger.silly(JSON.stringify(req.query, null, 2));
        const result: (IUserSchema & Document<IUserSchema>)[] =
          await queryFilterSort(req.query);
        res.status(200).json({ result, status: 'ok' });
        // res.end(JSON.stringify(result, null, 2));
        // return;
      }
    }
    logger.info(JSON.stringify(req.query));
    const users: (IUserSchema & Document<IUserSchema>)[] = await getAll();
    res.status(200).json({ users, status: 'ok' });
    // res.end(JSON.stringify(users, null, 2));
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
};

const createUser = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  try {
    const data: IUserSchema & Document<IUserSchema> = req.body.user;
    if (!data) {
      throw new Error('post user data not found!');
    }
    logger.info(JSON.stringify(data, null, 2));
    await createOne(data);
    res.status(201).json({ status: 'ok' });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
};

const findUserById = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  try {
    logger.info(req.params.id);
    const result: IUserSchema & Document<IUserSchema> = await findById(
      req.params.id
    );
    res.status(200).json({ result, status: 'ok' });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
};

const deleteUserById = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  try {
    logger.info(req.params.id);
    const result: IUserSchema & Document<IUserSchema> = await deleteById(
      req.params.id
    );
    res.status(200).json({ result, status: 'deleted' });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
  // res.end(JSON.stringify({ status: 'deleted' }, null, 2));
};

const storeUserImage = async (req: ExpressUploadRequest, res: Response | IResType): Promise<void> => {
  try {
    const { id } = req.params;
    const files: Array<{id: string, name: string, data: string}> = [];
    if (!req.files){
      throw new Error('file not found!!');
    }
    const arr: [string, UploadedFile][] = Object.entries(req.files) as [string, UploadedFile][];
    for (const [, v] of arr) {
      const data: string = v.data && Buffer.from(v.data).toString('base64');
      files.push({
        id,
        name: v.name,
        data,
      });
    }

    const firstImg: {id: string, name: string, data: string} = files.length && files[0];
    await putImage(id, firstImg.data);

    res.json({ ok: true, img: firstImg.data });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    res.status(500).json({
      error: error.message,
    });
  }
};

const registerUser = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  try {
    if (!req?.body?.email || !req?.body?.password || !req?.body?.name) {
      res.status(401).json({
        err: 'Email and Password are required',
      });

      return;
    }
    const data: IUserSchema & Document<IUserSchema> = { ...req.body };
    data.password = await getHash(data.password);
    await register(data);
    res.json({ status: 'ok' });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    res.status(500).json({ err: error.message });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.email && !req.body.password) {
      res.status(401).json({
        err: 'Email and Password are required',
      });

      return;
    }
    const user: (IUserSchema & Document<IUserSchema>)[] | boolean =
      await login(req.body);
    if (user?.[0]?.password) {
      const passMatched: unknown =
        getHash(req?.body?.password) === user?.[0]?.password;
      if (passMatched) {
        const token = jwt.sign(
          { id: user?.[0]?._id?.toString() },
          'randomTokenSecretKey123',
          { expiresIn: '2h' }
        );

        res.header('authorization', token).json({
          status: 'ok',
        });

        return;
      }
    }
    res.status(401).json({
      err: 'Login failed!',
    });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    res.status(500).json({
      err: error.message,
    });
  }
};

export {
  getUser,
  createUser,
  findUserById,
  deleteUserById,
  storeUserImage,
  registerUser,
  loginUser,
};
