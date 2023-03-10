import { Test, TestingModule } from '@nestjs/testing';
import sinon from 'sinon';
import { UserService } from './user.service';
import { UserModule } from './user.module';

// Modules
import { DatabaseModule, DatabaseService } from '@Database/database';

import to from 'await-to-js';

describe('UserService', () => {
  let service: UserService;
  let dataBase: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    dataBase = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get riders with status error', async () => {
    sinon
      .stub(dataBase.userRepository, 'find')
      .rejects('Error al realizar la consulta');
    const [error] = await to(service.getUsersRider());
    expect(error.message).toEqual('Error al realizar la consulta');
  });

  it('get drivers with status error', async () => {
    sinon
      .stub(dataBase.userRepository, 'find')
      .rejects('Error al realizar la consulta');
    const [error] = await to(service.getUsersDriver());

    expect(error.message).toEqual('Error al realizar la consulta');
  });
});
