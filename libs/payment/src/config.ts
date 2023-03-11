import { TConfigPayment } from './types';

const config: TConfigPayment = {
  PAYMENT_URL: process.env.PAYMENT_URL,
  MODE_DEV: process.env.MODE_DEV as unknown as boolean,
  PAYMENT_PRIVATE_KEY: process.env.PAYMENT_PRIVATE_KEY,
  PAYMENT_PUBLIC_KEY: process.env.PAYMENT_PUBLIC_KEY,
  PAYMENT_INTEGRITY_SECRET: process.env.PAYMENT_INTEGRITY_SECRET,
};

export default config;
