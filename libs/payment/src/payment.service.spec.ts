import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { Payment } from './classes/payment';
import { Request } from './classes/request';
import { PaymentModule } from './payment.module';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, Payment, Request],
      imports: [PaymentModule],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
