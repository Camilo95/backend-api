import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';

// Classes
import { Payment } from './classes/payment';
import { Request } from './classes/request';

@Module({
  providers: [PaymentService, Payment, Request],
  exports: [PaymentService],
})
export class PaymentModule {}
