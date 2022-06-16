import { Router } from 'express';

import {
  postUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController';

const router: Router = Router();

router.route('/').post(postUser).get(getUsers);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
