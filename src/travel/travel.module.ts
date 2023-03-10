import { Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

// Modules
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '@Database/database';
import { PaymentModule } from '@Payment/payment';

@Module({
  imports: [UserModule, DatabaseModule, PaymentModule],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
