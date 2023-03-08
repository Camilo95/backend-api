import { Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

// Modules
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '@Database/database';
import { WompiModule } from '@wompi/wompi';

@Module({
  imports: [UserModule, DatabaseModule, WompiModule],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
