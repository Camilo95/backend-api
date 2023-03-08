import { TConfigWompi } from './types';

const config: TConfigWompi = {
  WOMPI_URL_SANDBOX: process.env.WOMPI_URL_SANDBOX,
  WOMPI_URL_PRODUCTION: process.env.WOMPI_URL_PRODUCTION,
  MODE_DEV: process.env.MODE_DEV as unknown as boolean,
  WOMPI_PRIVATE_KEY: process.env.WOMPI_PRIVATE_KEY_TEST,
  WOMPI_PUBLIC_KEY: process.env.WOMPI_PUBLIC_KEY_TEST,
  UNIQUE_PAYMENT_REFERENCE: '54937',
  WOMPI_INTEGRITY_SECRET: process.env.WOMPI_INTEGRITY_SECRET, // x-codegen-request-body-name
};

export default config;
