import { Module } from '@nestjs/common';
import { DatabaseModule } from '@Database/database';
import { PaymentModule } from '@Payment/payment';
import { UserModule } from './user/user.module';
import { TravelModule } from './travel/travel.module';
import { PopulateModule } from './populate/populate.module';

@Module({
  imports: [
    DatabaseModule,
    PaymentModule,
    UserModule,
    TravelModule,
    PopulateModule,
  ],
})
export class AppModule {}
