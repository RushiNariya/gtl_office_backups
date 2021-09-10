import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from '@app/controllers/post';
import {
  getAll,
  createOne,
  getPostById,
  updatePostById,
  deletePostById,
} from '@app/services/post';
jest.mock('@app/services/post');
jest.mock('crypto');
jest.mock('jsonwebtoken');

describe('getPosts', () => {

  test('get all users default page', (done) => {

    getAll.mockImplementation(() => ({
      posts: [{}, {}, {}],
      totalItems: 3,
    }));
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && typeof input.posts === typeof [] && input.totalItems === 3) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    getPosts(req, res);
  });

  test('database not connected', (done) => {

    getAll.mockImplementation(() => {
      throw new Error('database not connected');
    });
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.err === 'database not connected') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    getPosts(req, res);
  });

  test('check get all post data', (done) => {

    getAll.mockImplementation(() => ({
      posts: [
        {
          _id: 'dfghsdffd',
          title: 'mypost',
        }
      ],
      totalItems: 1,
    }));
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.posts[0].title === 'mypost') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    getPosts(req, res);
  });
});

describe('getPost', () => {

  test('get user by id', (done) => {

    getPostById.mockImplementation(() => ({
      post: {
        _id: 'dtgdrfgldk',
        title: 'mypost',
        imageURL: 'gndfgndfgn',
        content:'fgndfgdnfglk',
        author: 'dfxgvndfbgn',
      },
    }));
    const req = {
      params:{
        postId: '111'
      }
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && typeof input.post === typeof {} && input.post.post.title === 'mypost') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    getPost(req, res);
  });

  test('post not found', (done) => {

    getPostById.mockImplementation(() => {
      return null;
    });
    const req = {};
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.err === 'Could not find post!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    getPost(req, res);
  });

});

describe('createPost', () => {

  test('create post', (done) => {

    const mockPost = {
      _id: 'dtgdrfgldk',
      title: 'mynewpost',
      imageURL: 'gndfgndfgn',
      content:'fgndfgdnfglk',
      author: 'dfxgvndfbgn',
    };

    const mockUser = {
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    };

    createOne.mockImplementation(() => ({
      post: mockPost,
      user: {
        _id: mockUser._id,
        name: mockUser.name,
      }
    }));
    const req = {
      body: {
        title: 'mynewpost',
        content: 'this is a new post.',
      },
      userId: 'rfhsdigi'
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.post.title === 'mynewpost' && input.author.name === 'rushi nariya') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    createPost(req, res);
  });

  test('body in empty', (done) => {

    const mockPost = {
      _id: 'dtgdrfgldk',
      title: 'mynewpost',
      imageURL: 'gndfgndfgn',
      content:'fgndfgdnfglk',
      author: 'dfxgvndfbgn',
    };

    const mockUser = {
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    };

    createOne.mockImplementation(() => ({
      post: mockPost,
      user: {
        _id: mockUser._id,
        name: mockUser.name,
      }
    }));
    const req = {
      body: {},
      userId: 'rfhsdigi'
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.err=== 'title and content is required!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    createPost(req, res);
  });

  test('userId not found', (done) => {

    createOne.mockImplementation(() => {
      throw new Error('userId not found!!');
    });
    const req = {
      body: {
        title: 'mynewpost',
        content: 'this is a new post.',
      },
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.err === 'userId not found!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    createPost(req, res);
  });
});

describe('updatePost', () => {
  test('update post', (done) => {

    const mockPost = {
      _id: 'dtgdrfgldk',
      title: 'updatedpost',
      imageURL: 'gndfgndfgn',
      content:'fgndfgdnfglk',
      author: 'dfxgvndfbgn',
    };

    updatePostById.mockImplementation(() => ({
      post: mockPost,
    }));

    const req = {
      body: {
        title: 'updatedpost',
        content: 'this is a new post.',
      },
      userId: 'rfhsdigi',
      params: {
        postId: 'tgdfgdfg',
      }
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
    updatePost(req, res);
  });

  test('body in empty', (done) => {

    const mockPost = {
      _id: 'dtgdrfgldk',
      title: 'mynewpost',
      imageURL: 'gndfgndfgn',
      content:'fgndfgdnfglk',
      author: 'dfxgvndfbgn',
    };

    updatePostById.mockImplementation(() => ({
      post: mockPost,
    }));
    const req = {
      body: {},
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.err=== 'title and content is required!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    updatePost(req, res);
  });

  test('userId not found', (done) => {

    updatePostById.mockImplementation((postId, userId) => {
      if (!userId){
        throw new Error('userId not found!!');
      }
    });
    const req = {
      body: {
        title: 'updatedpost',
        content: 'this is a new post.',
      },
      params: {
        postId: 'tgdfgdfg',
      }
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.err === 'userId not found!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    updatePost(req, res);
  });

  test('user not authorized', (done) => {

    const mockUser = {
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    };

    updatePostById.mockImplementation((userId) => {
      if (mockUser._id !== userId){
        throw new Error('user is not authorized!!');
      }
    });
    const req = {
      body: {
        title: 'updatedpost',
        content: 'this is a new post.',
      },
      params: {
        postId: 'sfdsjgnfd',
      },
      userId: 'rfhsdigi'
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        console.log('object', input);
        if (input && input.err === 'user is not authorized!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    updatePost(req, res);
  });

});

describe('deletePost', () => {
  test('delete successfully', (done) => {

    deletePostById.mockImplementation(() => ({
      message: 'Deleted post',
    }));
    const req = {
      params: {
        postId: 'sfdsjgnfd',
      },
      userId: 'rfhsdigi'
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.message === 'Deleted post') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    deletePost(req, res);
  });

  test('user not authorized', (done) => {

    const mockUser = {
      _id: 'dgfdsjgndfjg',
      name: 'rushi nariya',
      email: 'rushi@gmail.com',
    };

    deletePostById.mockImplementation((postId, userId) => {
      if (mockUser._id !== userId){
        throw new Error('user is not authorized!!');
      }
    });
    const req = {
      params: {
        postId: 'sfdsjgnfd',
      },
      userId: 'rfhsdigi'
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input && input.err === 'user is not authorized!!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {},
    };
    deletePost(req, res);
  });
});
