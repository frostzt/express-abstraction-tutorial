import { Request, Response } from 'express';
import logger from '../../lib/logger';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserService {
  public async getUser(req: Request, res: Response) {
    const allUsers = await prisma.user.findMany();
    res.status(200).json({ users: allUsers });
  }

  public async getUserById(req: Request, res: Response) {
    return res.send(`${req.params.id} route`);
  }

  public async createUser(req: Request, res: Response) {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(200).json({ user });
  }
}
