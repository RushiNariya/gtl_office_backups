/* eslint-disable newline-before-return */
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from '@app/backend/src/controllers/post';
import * as postService from '@app/backend/src/services/post';
import IGetAll from '../../interfaces/IGetAll';
import { IInput } from '../../interfaces/IInput';
import IPostSchema from '../../interfaces/IPostSchema';
import IRequest from '../../interfaces/IRequest';
import IResType from '../../interfaces/IResType';
import IUserSchema from '../../interfaces/IUserSchema';
import Post from '../../models/post';
import { Document } from 'mongoose';
import User from '../../models/user';

jest.mock('@app/backend/src/services/post');
jest.mock('crypto');
jest.mock('jsonwebtoken');

describe('getPosts', (): void => {
  const mockGetAll = jest.spyOn(postService, 'getAll');
  test('get all users default page', (done: jest.DoneCallback): void => {
    mockGetAll.mockImplementation(
      async (): Promise<IGetAll> => ({
        posts: [
          new Post({ title: 'blog', content: 'my blog' }),
          new Post({ title: 'article', content: 'my article' }),
          new Post({ title: 'vlog', content: 'my vlog' }),
        ],
        totalItems: 3,
      })
    );
    const req: Record<string, unknown> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (
          input &&
          typeof input.posts === typeof [] &&
          input.totalItems === 3
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
    getPosts(req as unknown as IRequest, res);
  });
  test('database not connected', (done): void => {
    mockGetAll.mockImplementation(
      async (): Promise<{
        totalItems: number;
        posts: (IPostSchema & Document<IPostSchema>)[];
      }> => {
        throw new Error('database not connected');
      }
    );
    const req: Record<string, unknown> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (input && input.err === 'database not connected') {
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
    getPosts(req as unknown as IRequest, res);
  });
  test('check get all post data', (done): void => {
    mockGetAll.mockImplementation(
      async (): Promise<{
        totalItems: number;
        posts: (IPostSchema & Document<IPostSchema>)[];
      }> => ({
        posts: [
          new Post({
            _id: 'dfghsdffd',
            title: 'mypost',
          }),
        ],
        totalItems: 1,
      })
    );
    const req: Record<string, unknown> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (input && input.posts[0].title === 'mypost') {
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
    getPosts(req as unknown as IRequest, res);
  });
});
describe('getPost', (): void => {
  const mockGetPostById = jest.spyOn(postService, 'getPostById');
  test('get user by id', (done): void => {
    mockGetPostById.mockImplementation(
      async (): Promise<IPostSchema & Document<IPostSchema>> =>
        new Post({
          _id: 'dtgdrfgldk',
          title: 'mypost',
          imageURL: 'gndfgndfgn',
          content: 'fgndfgdnfglk',
          author: 'dfxgvndfbgn',
        })
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req: Record<any, unknown> = {
      params: {
        postId: '111',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (
          input &&
          typeof input.post === typeof {} &&
          input.post.title === 'mypost'
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
    getPost(req as unknown as IRequest, res);
  });
  test('post not found', (done): void => {
    mockGetPostById.mockImplementation(
      async (): Promise<IPostSchema & Document<IPostSchema>> => {
        return null;
      }
    );
    const req: Record<string, unknown> = {};
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (input && input.err === 'Could not find post!!') {
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
    getPost(req as unknown as IRequest, res);
  });
});
describe('createPost', (): void => {
  const mockCreateOne = jest.spyOn(postService, 'createOne');
  test('create post', (done): void => {
    const mockPost: IPostSchema & Document<IPostSchema> = new Post({
      _id: 'dtgdrfgldk',
      title: 'mynewpost',
      imageURL: 'gndfgndfgn',
      content: 'fgndfgdnfglk',
      author: 'dfxgvndfbgn',
    });
    const mockUser: IUserSchema & Document<IUserSchema> = new User({
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    });
    mockCreateOne.mockImplementation(
      async (): Promise<{
        post: IPostSchema & Document<IPostSchema>;
        user: IUserSchema & Document<IUserSchema>;
      }> => ({
        post: mockPost,
        user: mockUser,
      })
    );
    const req: Record<string, unknown> = {
      body: {
        title: 'mynewpost',
        content: 'this is a new post.',
      },
      userId: 'rfhsdigi',
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
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
    createPost(req as unknown as IRequest, res);
  });
  test('body in empty', (done): void => {
    const mockPost: IPostSchema & Document<IPostSchema> = new Post({
      _id: 'dtgdrfgldk',
      title: 'mynewpost',
      imageURL: 'gndfgndfgn',
      content: 'fgndfgdnfglk',
      author: 'dfxgvndfbgn',
    });
    const mockUser: IUserSchema & Document<IUserSchema> = new User({
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    });
    mockCreateOne.mockImplementation(
      async (): Promise<{
        post: IPostSchema & Document<IPostSchema>;
        user: IUserSchema & Document<IUserSchema>;
      }> => ({
        post: mockPost,
        user: mockUser,
      })
    );
    const req: Record<string, unknown> = {
      body: {},
      userId: 'rfhsdigi',
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (input && input.err === 'title and content is required!!') {
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
    createPost(req as unknown as IRequest, res);
  });
  test('userId not found', (done): void => {
    mockCreateOne.mockImplementation(
      async (): Promise<{
        post: IPostSchema & Document<IPostSchema>;
        user: IUserSchema & Document<IUserSchema>;
      }> => {
        throw new Error('userId not found!!');
      }
    );
    const req: Record<string, unknown> = {
      body: {
        title: 'mynewpost',
        content: 'this is a new post.',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        console.log(input);
        if (input && input.err) {
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
    createPost(req as unknown as IRequest, res);
  });
});
describe('updatePost', (): void => {
  const mockUpdatePostById = jest.spyOn(postService, 'updatePostById');
  test('update post', (done): void => {
    const mockPost: IPostSchema & Document<IPostSchema> = new Post({
      _id: '1234',
      title: 'updatedpost',
      imageURL: 'gndfgndfgn',
      content: 'fgndfgdnfglk',
      author: '123',
    });
    mockUpdatePostById.mockImplementation(
      async (): Promise<IPostSchema & Document<IPostSchema>> => mockPost
    );
    const req: Record<string, unknown> = {
      body: {
        title: 'updatedpost',
        content: 'this is a new post.',
      },
      userId: 'rfhsdigi',
      params: {
        postId: 'tgdfgdfg',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
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
    updatePost(req as unknown as IRequest, res);
  });
  test('body in empty', (done): void => {
    const mockPost: IPostSchema & Document<IPostSchema> = new Post({
      _id: '1234',
      title: 'mynewpost',
      imageURL: 'gndfgndfgn',
      content: 'fgndfgdnfglk',
      author: '123',
    });
    mockUpdatePostById.mockImplementation(
      async (): Promise<IPostSchema & Document<IPostSchema>> => mockPost
    );
    const req: Record<string, unknown> = {
      body: {},
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (input && input.err === 'title and content is required!!') {
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
    updatePost(req as unknown as IRequest, res);
  });
  test('userId not found', (done): void => {
    mockUpdatePostById.mockImplementation(
      async (
        postId,
        userId
      ): Promise<IPostSchema & Document<IPostSchema>> => {
        if (!userId) {
          throw new Error('userId not found!!');
        }
        return;
      }
    );
    const req: Record<string, unknown> = {
      body: {
        title: 'updatedpost',
        content: 'this is a new post.',
      },
      params: {
        postId: 'tgdfgdfg',
      },
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (input && input.err === 'userId not found!!') {
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
    updatePost(req as unknown as IRequest, res);
  });
  test('user not authorized', (done): void => {
    const mockUser: IUserSchema & Document<IUserSchema> = new User({
      _id: '123',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    });
    mockUpdatePostById.mockImplementation(
      async (userId): Promise<IPostSchema & Document<IPostSchema>> => {
        if (mockUser._id !== userId) {
          throw new Error('user is not authorized!!');
        }
        return;
      }
    );
    const req: Record<string, unknown> = {
      body: {
        title: 'updatedpost',
        content: 'this is a new post.',
      },
      params: {
        postId: 'sfdsjgnfd',
      },
      userId: 'rfhsdigi',
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        console.log('object', input);
        if (input && input.err === 'user is not authorized!!') {
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
    updatePost(req as unknown as IRequest, res);
  });
});
describe('deletePost', (): void => {
  const mockDeletePostById = jest.spyOn(postService, 'deletePostById');
  test('delete successfully', (done): void => {
    mockDeletePostById.mockImplementation(async (): Promise<void> => null);
    const req: Record<string, unknown> = {
      params: {
        postId: 'sfdsjgnfd',
      },
      userId: 'rfhsdigi',
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (input && input.message === 'Deleted post') {
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
    deletePost(req as unknown as IRequest, res);
  });
  test('user not authorized', (done): void => {
    const mockUser: IUserSchema & Document<IUserSchema> = new User({
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    });

    mockDeletePostById.mockImplementation(
      async (postId, userId): Promise<void> => {
        if (mockUser._id !== userId) {
          throw new Error('user is not authorized!!');
        }
      }
    );
    const req: Record<string, unknown> = {
      params: {
        postId: 'sfdsjgnfd',
      },
      userId: 'rfhsdigi',
    };
    const res: IResType = {
      status: function () {
        return this;
      },
      json: (input: IInput = {}) => {
        if (input && input.err === 'user is not authorized!!') {
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
    deletePost(req as unknown as IRequest, res);
  });
});
