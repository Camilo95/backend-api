import { Module } from '@nestjs/common';
import { WompiService } from './wompi.service';

// Classes
import { Wompi } from './classes/wompi';
import { Request } from './classes/request';

@Module({
  providers: [WompiService, Wompi, Request],
  exports: [WompiService],
})
export class WompiModule {}
