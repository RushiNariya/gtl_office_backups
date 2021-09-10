import {
  getUser,
  createUser,
  findUserById,
  deleteUserById,
  storeUserImage,
  registerUser,
  loginUser,
} from '@app/backend/src/controllers/user';
import * as userService from '@app/backend/src/services/user';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import { IInput } from '../../interfaces/IInput';
import IUserSchema from '../../interfaces/IUserSchema';
import User from '../../models/user';
import IResType from '../../interfaces/IResType';
import { Request, Response } from 'express';
import { getHash } from '@app/lib/src/password';

jest.mock('@app/backend/src/services/user');
jest.mock('crypto');
jest.mock('jsonwebtoken');

beforeEach(() => {
  const mockScryptSync = jest.spyOn(crypto, 'scryptSync');
  mockScryptSync.mockImplementation(() => Buffer.from('password'));
  const mockJWT = jest.spyOn(jwt, 'sign');
  mockJWT.mockImplementation(() => true);
});

describe('storeUserImage', () => {
  const mockPutImage = jest.spyOn(userService, 'putImage');

  test('email password required', (done) => {
    mockPutImage.mockImplementation(
      async (): Promise<IUserSchema & Document<IUserSchema>> => {
        return;
      }
    );
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input.ok === true) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    const req: Record<string, unknown> = {
      params: {
        id: '123',
      },
      files: {
        a: './demo.txt',
      },
    };
    storeUserImage(req as unknown as Request, res);
  });

  test('user id is required', (done) => {
    mockPutImage.mockImplementation(() => null);
    const req: Partial<Request> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input && input.error === 'Cannot read property \'id\' of undefined') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    storeUserImage(req as Request, res);
  });

  test('file not is required', (done) => {
    mockPutImage.mockImplementation(() => null);
    const req: Partial<Request> = {
      params: {
        id: '123',
      },
      files: null,
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input && input.error === 'file not found!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    storeUserImage(req as Request, res);
  });
});

describe('loginUser', () => {
  const mockLogin = jest.spyOn(userService, 'login');

  test('email password required', (done) => {
    const req: Partial<Request> = {
      body: {
        email: '',
        password: '',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input.err === 'Email and Password are required') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    loginUser(req as Request, res as unknown as Response);
  });

  test('failed login', (done) => {
    mockLogin.mockImplementation(() => null);

    const req: Partial<Request> = {
      body: {
        email: 'myEmail',
        password: 'password',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input.err === 'Login failed!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    loginUser(req as Request, res as unknown as Response);
  });

  test('Auth_success', (done) => {
    mockLogin.mockImplementation(async () => [
      new User({
        password: getHash('password',),
        _id: 'Id123',
      }),
    ]);
    const req: Partial<Request> = {
      body: {
        email: 'myEmail',
        password: 'password',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    loginUser(req as Request, res as unknown as Response);
  });
});

describe('createUser', () => {
  const mockCreateOne = jest.spyOn(userService, 'createOne');

  test('create new user successfully', (done) => {
    const mockUser: IUserSchema & Document<IUserSchema> = new User({
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    });
    mockCreateOne.mockImplementation(async () => null);
    const req: Partial<Request> = {
      body: {
        user: mockUser,
      }
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input && input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    createUser(req as Request, res);
  });

  test('req.user in empty', (done) => {
    mockCreateOne.mockImplementation(async () => null);
    const req: Partial<Request> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (
          input &&
          input.status === 'failed'
        ) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    createUser(req as Request, res);
  });
});

describe('registeruser', () => {
  const mockRegister = jest.spyOn(userService, 'register');

  test('req. body not found', (done) => {
    mockRegister.mockImplementation(async () => null);
    const req: Partial<Request> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        console.log('hello', input);
        if (input && input.err === 'Email and Password are required') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    registerUser(req as Request, res);
  });

  test('user registered successfully', (done) => {
    mockRegister.mockImplementation(async () => null);
    const req: Partial<Request> = {
      body: {
        name: 'rushi',
        email: 'someone@gmail.com',
        password: 'dfsgkjdnfgk34@',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        // console.log("hello", input);
        if (input && input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    registerUser(req as Request, res);
  });
});

describe('getusers', () => {
  const mockGetAll = jest.spyOn(userService, 'getAll');
  const mockQueryFilterSort = jest.spyOn(userService, 'queryFilterSort');

  test('get all users', (done) => {
    mockGetAll.mockImplementation(async () => [
      new User({ name: 'rushi' }),
      new User({ name: 'parth' }),
      new User({ name: 'kuldip' }),
    ]);
    const req: Partial<Request> = {
      query: null,
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (
          (input && input.status === 'ok' && input.users.length === 3,
          typeof input.users === typeof [])
        ) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    getUser(req as Request, res);
  });
  test('get filtered users', (done) => {
    mockQueryFilterSort.mockImplementation(async () => []);
    const req: Partial<Request> = {
      query: {
        sort: 'asc',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    getUser(req as Request, res);
  });
});

describe('getUserById', () => {

  const mockFindById = jest.spyOn(userService, 'findById');

  test('get user by id', (done) => {
    mockFindById.mockImplementation(async () => new User({
      _id: 'gfhff',
      name: 'rushi',
      email: 'rushi@gmail.com',
    }));
    const req: Partial<Request> = {
      params: {
        id: 'dsfdsf',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input && input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    findUserById(req as Request, res);
  });

  test('user id is required', (done) => {
    mockFindById.mockImplementation(async () => null);
    const req: Partial<Request> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (
          input &&
          input.status === 'failed' &&
          input.error === 'Cannot read property \'id\' of undefined'
        ) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    findUserById(req as Request, res);
  });
});

describe('deleteUserById', () => {

  const mockDeleteById = jest.spyOn(userService, 'deleteById');

  test('delete user by id', (done) => {
    mockDeleteById.mockImplementation(() => null);
    const req: Partial<Request> = {
      params: {
        id: 'dsfdsf',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (input && input.status === 'deleted') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    deleteUserById(req as Request, res);
  });

  test('user id is required', (done) => {
    mockDeleteById.mockImplementation(() => null);
    const req: Partial<Request> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}): void => {
        if (
          input &&
          input.error === 'Cannot read property \'id\' of undefined' &&
          input.status === 'failed'
        ) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {
        return this;
      },
    };
    deleteUserById(req as Request, res);
  });
});
