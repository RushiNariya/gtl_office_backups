import {
  getAll,
  createOne,
  findById,
  queryFilterSort,
  deleteById,
  putImage,
  login,
  register,
} from '@app/services/user';
import jwt from 'jsonwebtoken';

import Logger from '@app/utils/logger';
import { getHash } from '@app/utils/password';

const logger = new Logger('Routes', 'user.js');

const getUser = async (req, res) => {
  logger.debug('User GET All');

  try {
    if (req?.query){
      const keys = Object.keys(req.query);
      if (keys.length) {
        logger.silly(JSON.stringify(req.query, null, 2));
        const result = await queryFilterSort(req.query);
        res.status(200).json({result, status: 'ok' });
        // res.end(JSON.stringify(result, null, 2));
        // return;
      }
    }
    logger.info(JSON.stringify(req.query));
    const users = await getAll();
    res.status(200).json({users, status: 'ok' });
    // res.end(JSON.stringify(users, null, 2));
  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const data = req?.user;
    if (!data){
      throw new Error('post user data not found!');
    }
    logger.info(JSON.stringify(data, null, 2));
    await createOne(data);
    res.status(201).json({ status: 'ok' });
  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err.message,
    });
  }
};

const findUserById = async (req, res) => {
  try {
    logger.info(req.params.id);
    const result = await findById(req.params.id);
    res.status(200).json({result, status: 'ok' });
  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    logger.info(req.params.id);
    const result = await deleteById(req.params.id);
    res.status(200).json({result, status: 'deleted' });
  }
  catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err.message,
    });
  }
  // res.end(JSON.stringify({ status: 'deleted' }, null, 2));
};

const storeUserImage = async (req, res) => {
  try {
    const { id } = req.params;
    const files = [];
    if (!req.files){
      throw new Error('file not found!!');
    }
    const arr = Object.entries(req.files);
    for (const [, v] of arr) {
      const data = v.data && Buffer.from(v.data).toString('base64');
      files.push({
        id,
        name: v.name,
        data,
      });
    }

    const firstImg = files.length && files[0];
    await putImage(id, firstImg.data);

    res.json({ ok: true, img: firstImg.data });
  }
  catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    if (!req?.body?.email || !req?.body?.password) {
      res.status(401).json({
        err: 'Email and Password are required',
      });

      return;
    }
    const data = { ...req.body };
    data.password = await getHash(data.password);
    await register(data);
    res.json({ status: 'ok' });
  }
  catch (err) {
    res.end(JSON.stringify({ err: err.message }));
  }
};

const loginUser = async (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(401).json({
      err: 'Email and Password are required',
    });

    return;
  }
  const user = await login(req.body);
  if (user?.[0]?.password) {
    const passMatched = getHash(req?.body?.password) === user?.[0]?.password;
    if (passMatched) {
      const token = jwt.sign({ id: user?.[0]?._id?.toString() }, 'randomTokenSecretKey123', { expiresIn: '2h' });

      res.header('authorization', token).json({
        status: 'ok',
      });

      return;
    }
  }
  res.status(401).json({
    err: 'Login failed!',
  });
};

export {
  getUser,
  createUser,
  findUserById,
  deleteUserById,
  storeUserImage,
  registerUser,
  loginUser
};