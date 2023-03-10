import { TConfigPayment } from './types';

const config: TConfigPayment = {
  PAYMENT_URL_SANDBOX: process.env.PAYMENT_URL_SANDBOX,
  PAYMENT_URL_PRODUCTION: process.env.PAYMENT_URL_PRODUCTION,
  MODE_DEV: process.env.MODE_DEV as unknown as boolean,
  PAYMENT_PRIVATE_KEY: process.env.PAYMENT_PRIVATE_KEY_TEST,
  PAYMENT_PUBLIC_KEY: process.env.PAYMENT_PUBLIC_KEY_TEST,
  UNIQUE_PAYMENT_REFERENCE: '54937',
  PAYMENT_INTEGRITY_SECRET: process.env.PAYMENT_INTEGRITY_SECRET, // x-codegen-request-body-name
};

export default config;
