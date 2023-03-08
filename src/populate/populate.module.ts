import { Module } from '@nestjs/common';
import { PopulateController } from './populate.controller';
import { PopulateService } from './populate.service';

// Libs
import { DatabaseModule } from '@Database/database';

@Module({
  imports: [DatabaseModule],
  controllers: [PopulateController],
  providers: [PopulateService],
})
export class PopulateModule {}
