import * as Express from 'express';
import { createUser, getUser, storeUserImage, findUserById, deleteUserById } from '@app/backend/src/controllers/user';

const router: Express.Router = Express.Router();

router.get('/', getUser);

router.post('/', createUser);

router.route('/:id/image').post(storeUserImage);

router
  .route('/:id')
  .get(findUserById)
  .delete(deleteUserById);

export default router;