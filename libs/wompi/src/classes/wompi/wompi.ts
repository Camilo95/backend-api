import { Injectable } from '@nestjs/common';
import to from 'await-to-js';
import config from '../../config';

// Types
import {
  TResponseMerchant,
  TResponseTransaction,
  TTransaction,
} from '../../types';

// Classes
import { Request } from '../request';

@Injectable()
export class Wompi {
  private transacction: TTransaction;

  constructor(private readonly request: Request) {}

  private async generateSignatureSHA256() {
    let concatString = `${this.transacction.reference}`;
    concatString = `${concatString}${this.transacction.amount_in_cents}`;
    concatString = `${concatString}${this.transacction.currency}`;
    concatString = `${concatString}${config.WOMPI_INTEGRITY_SECRET}`;

    const encondedText = new TextEncoder().encode(concatString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return hashHex;
  }

  private getBaseUrl() {
    return config.MODE_DEV
      ? config.WOMPI_URL_SANDBOX
      : config.WOMPI_URL_PRODUCTION;
  }

  async getMerchant() {
    const baseUrl = this.getBaseUrl();
    const path = `/merchants/${config.WOMPI_PUBLIC_KEY}`;

    // configure base url and headers for the request
    const url = `${baseUrl}${path}`;
    const options: RequestInit = {
      headers: {
        accept: 'application/json',
      },
      method: 'GET',
    };
    const [error, data] = await to(
      this.request.request<TResponseMerchant>(url, options),
    );
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async createTransaction(transaction: TTransaction) {
    const baseUrl = this.getBaseUrl();
    const path = '/transactions';

    this.transacction = transaction;
    this.transacction.signature = await this.generateSignatureSHA256();

    // configure base url and headers for the request
    const url = `${baseUrl}${path}`;
    const options: RequestInit = {
      headers: {
        Authorization: `Bearer ${config.WOMPI_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      method: 'POST',
    };

    options.body = this.transacction as object as BodyInit;

    const [error, response] = await to(
      this.request.request<TResponseTransaction>(url, options),
    );
    if (error) {
      throw new Error(error.message);
    }

    return response;
  }

  async getTransaction(idTransaction: string) {
    const baseUrl = this.getBaseUrl();
    const path = `/transactions/${idTransaction}`;

    // configure base url and headers for the request
    const url = `${baseUrl}${path}`;
    const options: RequestInit = {
      headers: {
        accept: 'application/json',
      },
      method: 'POST',
    };

    const [error, response] = await to(
      this.request.request<TResponseTransaction>(url, options),
    );
    if (error) {
      throw new Error(error.message);
    }

    return response;
  }
}
