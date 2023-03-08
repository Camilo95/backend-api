import { Injectable } from '@nestjs/common';
import to from 'await-to-js';

// Types
import { TPresignedAcceptance, TTransaction } from './types';

// Classes
import { Wompi } from './classes/wompi';

@Injectable()
export class WompiService {
  constructor(private readonly wompi: Wompi) {}

  public async sendTransaction(newTransaction: TTransaction) {
    const [error, responseTransaction] = await to(
      this.wompi.createTransaction(newTransaction),
    );
    if (error) {
      throw new Error('Error');
    }
    return responseTransaction;
  }

  public async getAcceptanceToken(): Promise<TPresignedAcceptance> {
    const merchant = await this.wompi.getMerchant();
    return merchant.data.presigned_acceptance;
  }

  public convertAmountToCents(amount: number | string): number {
    if (typeof amount === 'string') {
      amount = parseInt(amount, 10);
    }

    return amount * 100;
  }
}
