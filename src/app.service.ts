import { DatabaseService } from '@Database/database';
import { Injectable } from '@nestjs/common';
import { WompiService } from '@wompi/wompi';
import { CURRENCY, PAYMENTS_METHOD, TTransaction } from '@wompi/wompi/types';

@Injectable()
export class AppService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly wompiService: WompiService,
  ) {}

  async getHello() {
    // Payment
    const token = await this.wompiService.getAcceptanceToken();
    const newTransaction: TTransaction = {
      currency: CURRENCY.COP,
      customer_email: 'email@example.com',
      payment_method: {
        type: PAYMENTS_METHOD.CARD,
        token: 'tok_test_37635_af70e475Ddfd90C9000C979a26204AD4',
        installments: 1,
      },
      reference: '784378',
      amount_in_cents: this.wompiService.convertAmountToCents(3000),
      acceptance_token: token.acceptance_token,
    };
    console.log('Transaction: ', newTransaction);
    await this.wompiService.sendTransaction(newTransaction);
  }
}
