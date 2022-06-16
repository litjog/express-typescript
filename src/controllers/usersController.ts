import { Request, Response, NextFunction } from 'express';

import Users from '../models/Users';

const users = new Users();

export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, username, age } = req.body;
    const user = await users.insert({ name, username, age });

    res.status(200).json({ success: true, user });
  } catch (e) {
    next(e);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const allUser = await users.selectAll();

    res.status(200).json({ success: true, users: allUser });
  } catch (e) {
    next(e);
  }
}

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const user = await users.selectById(id);

    res.status(200).json({ success: true, user });
  } catch (e) {
    next(e);
  }
}

export function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { name, username, age } = req.body;
    const user = users.update({ id, name, username, age });

    res.status(200).json({ success: true, user });
  } catch (e) {
    next(e);
  }
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    users.delete(id);

    res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
}
