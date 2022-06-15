import { Router, Request, Response } from 'express';

import User from '../models/user';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.send('Hello world');
});

router.get('/:name', async (req: Request, res: Response) => {
  const user = new User(req.params.name || 'Anonymous');
  res.send(user.greet());
});

export default router;
