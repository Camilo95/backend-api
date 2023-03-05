import { ConfigDto } from './dtos';

const config: ConfigDto = {
  URL_SANDBOX: 'https://sandbox.wompi.co',
  URL_PRODUCTION: 'https://production.wompi.co',
  UNIQUE_PAYMENT_REFERENCE: '54937',
  INTEGRITY_SECRET: process.env.WOMPI_INTEGRITY_SECRET,
};

export default config;
