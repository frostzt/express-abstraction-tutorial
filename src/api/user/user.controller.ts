import { Request, Response } from 'express';
import Controller from '../../decorators/RouteDecorators/controller.decorator';
import { Get, Post } from '../../decorators/RouteDecorators/handlers.decorator';
import UserService from './user.service';

import UserRoles from '../../enums/useroles.enum';
import restrictTo from '../../middlewares/restrictTo.middleware';

@Controller('/api/users')
export default class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  @Get('', [restrictTo(UserRoles.ADMIN)])
  public async getUsers(req: Request, res: Response) {
    return this.userService.getUser(req, res);
  }

  @Get('/:id', [restrictTo(UserRoles.USER)])
  public async getUserById(req: Request, res: Response) {
    return this.userService.getUserById(req, res);
  }

  @Post('')
  public async createUser(req: Request, res: Response) {
    return this.userService.createUser(req, res);
  }
}
