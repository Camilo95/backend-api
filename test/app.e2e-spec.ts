import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { users } from './variables';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/populate/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/all')
      .send(users)
      .expect(200);
  });

  it('/user/all (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/all')
      .expect(200)
      .expect(users);
  });
});
