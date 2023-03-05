import { Injectable } from '@nestjs/common';
import { TTransaction } from './dtos/wompi.dto';
import config from './config';

@Injectable()
export class WompiService {
  private transacction: TTransaction;

  private async generateSignatureSHA256() {
    let concatString = `${this.transacction.reference}`;
    concatString = `${concatString}${this.transacction.amount_in_cents}`;
    concatString = `${concatString}${this.transacction.currency}`;
    concatString = `${concatString}${config.INTEGRITY_SECRET}`;

    const encondedText = new TextEncoder().encode(concatString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    console.log(hashHex);
    return hashHex;
  }

  private convertAmountToCents(amount: number) {
    if (typeof amount === 'string') {
      amount = parseInt(amount, 10);
    }

    return amount * 100;
  }
}
