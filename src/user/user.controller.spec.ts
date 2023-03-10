import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { DatabaseModule } from '@Database/database';
import { UserService } from './user.service';
import { UserModule } from './user.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get drivers', async () => {
    await controller.handlerGetUserDrivers();
    expect(controller).toBeDefined();
  });

  it('get riders', async () => {
    await controller.handlerGetUserRiders();
    expect(controller).toBeDefined();
  });
});
