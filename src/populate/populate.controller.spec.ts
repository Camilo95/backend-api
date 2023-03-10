import { Test, TestingModule } from '@nestjs/testing';
import { PopulateController } from './populate.controller';
import { PopulateService } from './populate.service';
import { DatabaseModule } from '@Database/database';
import { users } from '../../test/variables';
import { UserDto } from './dtos';

describe('PopulateController', () => {
  let controller: PopulateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [PopulateController],
      providers: [PopulateService],
    }).compile();

    controller = module.get<PopulateController>(PopulateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('run import users', async () => {
    await controller.handlerPopulateUsers(users as UserDto[]);
    expect(controller).toBeDefined();
  });
});
