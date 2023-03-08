import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@Database/database';
import { WompiModule } from '@wompi/wompi';
import { UserModule } from './user/user.module';
import { TravelModule } from './travel/travel.module';
import { PopulateModule } from './populate/populate.module';

@Module({
  imports: [
    DatabaseModule,
    WompiModule,
    UserModule,
    TravelModule,
    PopulateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
