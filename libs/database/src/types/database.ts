export type DialectsDB = 'mysql' | 'postgres' | 'mongodb';

export type TConfigDto = {
  DB_DIALECT: DialectsDB;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_SYNCHRONIZE: boolean;
  DB_LOGGER: boolean;
  DB_AUTO_LOAD_ENTITIES: boolean;
};
