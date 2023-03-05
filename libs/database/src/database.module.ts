import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { database, models } from './configs/appDataSource';

@Module({
  imports: [...database],
  providers: [DatabaseService, ...models],
  exports: [DatabaseService],
})
export class DatabaseModule {}
