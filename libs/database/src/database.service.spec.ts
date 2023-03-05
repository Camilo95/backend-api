import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { DatabaseModule } from './database.module';
import { database, models } from './configs/appDataSource';

import { User } from './models';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ...database],
      providers: [DatabaseService, ...models],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a user instance and validate her methods', () => {
    const user = new User();
    user.firstName = 'Camilo';
    user.lastName = 'Cabrera';
    user.hashPassword = '12345';
    user.email = 'camilo@gmail.com';
    user.type = 'CONDUCTOR';

    expect(user.getFullName()).toEqual('Camilo Cabrera');
    expect(user.hashPassword).toEqual(
      '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
    );
  });
});
