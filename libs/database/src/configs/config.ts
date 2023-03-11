import { DialectsDB, TConfigDto } from '../types';

/* A configuration file for the database. */
const config: TConfigDto = {
  DB_DIALECT: (process.env.DB_DIALECT as DialectsDB) || 'postgres',
  DB_HOST: process.env.DB_HOST || 'postgres_db',
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
  DB_DATABASE: process.env.DB_DATABASE || 'platform',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_SYNCHRONIZE: (process.env.SYNCHRONIZE as unknown as boolean) || true,
  DB_LOGGER: (process.env.DB_LOGGER as unknown as boolean) || false,
  DB_AUTO_LOAD_ENTITIES:
    (process.env.DB_AUTO_LOAD_ENTITIES as unknown as boolean) || true,
};

export default config;
