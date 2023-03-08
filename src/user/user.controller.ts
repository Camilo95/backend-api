import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async handlerGetUsers() {
    return this.userService.getUsers();
  }

  @Get('drivers')
  handlerGetUserDrivers() {
    return this.userService.getUsersDriver();
  }

  @Get('riders')
  handlerGetUserRiders() {
    return this.userService.getUsersRider();
  }
}
