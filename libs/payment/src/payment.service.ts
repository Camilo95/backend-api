import { Injectable } from '@nestjs/common';
import to from 'await-to-js';

// Classes
import { Payment } from './classes/payment';

// Types
import { TTransaction } from './types';

@Injectable()
export class PaymentService {
  constructor(private readonly wompi: Payment) {}

  public async sendTransaction(newTransaction: TTransaction) {
    const [error, responseTransaction] = await to(
      this.wompi.createTransaction(newTransaction),
    );
    if (error) {
      throw new Error('Error');
    }
    return responseTransaction;
  }

  public async getAcceptanceToken() {
    const merchant = await this.wompi.getMerchant();
    return merchant.data.presigned_acceptance;
  }

  public async getTransaction(idTransaction: string) {
    const transaction = await this.wompi.getTransaction(idTransaction);
    return transaction;
  }

  public convertAmountToCents(amount: number | string): number {
    if (typeof amount === 'string') {
      amount = parseInt(amount, 10);
    }

    return amount * 100;
  }
}
