import {
  getUser,
  createUser,
  findUserById,
  deleteUserById,
  storeUserImage,
  registerUser,
  loginUser,
} from '@app/controllers/user';

import {
  getAll,
  createOne,
  findById,
  deleteById,
  queryFilterSort,
  putImage,
  register,
  login,
} from '@app/services/user';

import { scryptSync } from 'crypto';
import jwt from 'jsonwebtoken';

jest.mock('@app/services/user');
jest.mock('crypto');
jest.mock('jsonwebtoken');

beforeEach(() => {
  scryptSync.mockImplementation(() => 'password');
  jwt.sign.mockImplementation(() => true);
});

describe('storeUserImage', () => {
  test('email password required', (done) => {
    putImage.mockImplementation(() => null);

    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input.ok === true) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };

    // Buffer.from = () => ({
    //   toString: () => 'bb'
    // });
    const req = {
      params: {
        id: '123',
      },
      files: {
        a: { data: 'b' },
      },
    };

    storeUserImage(req, res);
  });

  test('user id is required', (done) => {
    putImage.mockImplementation(() => null);
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.error === 'Cannot read property \'id\' of undefined') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    storeUserImage(req, res);
  });

  test('file not is required', (done) => {
    putImage.mockImplementation(() => null);
    const req = {
      params: {
        id: '123',
      },
      files: null,
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.error === 'file not found!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    storeUserImage(req, res);
  });
});

describe('loginUser', () => {
  test('email password required', (done) => {
    const req = {
      body: {
        email: '',
        password: '',
      },
    };

    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input.err === 'Email and Password are required') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    loginUser(req, res);
  });

  test('failed login', (done) => {
    login.mockImplementation(() => null);

    const req = {
      body: {
        email: 'myEmail',
        password: 'password',
      },
    };

    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input.err === 'Login failed!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    loginUser(req, res);
  });

  test('Auth_success', (done) => {
    login.mockImplementation(() => [
      {
        password: 'password',
        _id: 'Id123',
      },
    ]);

    const req = {
      body: {
        email: 'myEmail',
        password: 'password',
      },
    };

    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
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
    loginUser(req, res);
  });
});

describe('createUser', () => {
  test('create new user successfully', (done) => {
    const mockUser = {
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    };

    createOne.mockImplementation(() => ({}));
    const req = {
      user: mockUser,
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    createUser(req, res);
  });

  test('req.user in empty', (done) => {

    createOne.mockImplementation(() => ({}));
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (
          input &&
          input.status === 'failed' &&
          input.error === 'post user data not found!'
        ) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    createUser(req, res);
  });
});

describe('registeruser', () => {
  test('req. body not found', (done) => {

    register.mockImplementation(() => ({}));
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        console.log('hello', input);
        if (input && input.err === 'Email and Password are required') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    registerUser(req, res);
  });

  test('user registered successfully', (done) => {
    register.mockImplementation(() => ({}));
    const req = {
      body: {
        email: 'someone@gmail.com',
        password: 'dfsgkjdnfgk34@',
      },
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        // console.log("hello", input);
        if (input && input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    registerUser(req, res);
  });
});

describe('getusers', () => {
  test('get all users', (done) => {
    getAll.mockImplementation(() => ({
      users: [{}, {}, {}],
      status: 'ok',
    }));
    const req = {
      query: null,
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
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
      header: () => {},
    };
    getUser(req, res);
  });
  test('get filtered users', (done) => {
    queryFilterSort.mockImplementation(() => []);
    const req = {
      query: {
        sort: 'asc',
      },
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    getUser(req, res);
  });
});

describe('getUserById', () => {
  test('get user by id', (done) => {
    findById.mockImplementation(() => ({
      _id: 'gfhff',
      name: 'rushi',
      email: 'rushi@gmail.com',
    }));
    const req = {
      params: {
        id: 'dsfdsf',
      },
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.status === 'ok' && input.result.name === 'rushi') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    findUserById(req, res);
  });

  test('user id is required', (done) => {
    findById.mockImplementation(() => null);
    const req = {
      // params: {
      //   id: "dsfdsf",
      // }
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
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
      header: () => {},
    };
    findUserById(req, res);
  });
});

describe('deleteUserById', () => {
  test('delete user by id', (done) => {
    deleteById.mockImplementation(() => null);
    const req = {
      params: {
        id: 'dsfdsf',
      },
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.status === 'deleted') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    deleteUserById(req, res);
  });

  test('user id is required', (done) => {
    deleteById.mockImplementation(() => null);
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
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
      header: () => {},
    };
    deleteUserById(req, res);
  });
});
