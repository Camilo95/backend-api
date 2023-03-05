import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import config from './config';

//Models
import { User, MethodPayment } from '../models';

export const models = [User, MethodPayment];

const options: DataSourceOptions = {
  type: config.DB_DIALECT,
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  logging: config.DB_LOGGER,
  synchronize: config.DB_SYNCHRONIZE,
  entities: models,
};

export const database = [
  TypeOrmModule.forRoot(options),
  TypeOrmModule.forFeature(models),
];
