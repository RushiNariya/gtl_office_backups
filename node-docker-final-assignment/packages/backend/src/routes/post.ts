import * as Express from 'express';

import { createPost, deletePost, getPost, getPosts, updatePost } from '@app/backend/src/controllers/post';

const postRouter: Express.Router = Express.Router();

postRouter.get('/', getPosts);

postRouter.route('/').post(createPost);

postRouter.get('/:postId', getPost);

postRouter.put('/:postId', updatePost);

postRouter.delete('/:postId', deletePost);

export default postRouter;
