import { Body, Controller, Post } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelDto } from './dtos/travel.dto';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post('start')
  handlerCreateServiceTravel(@Body() travel: TravelDto) {
    return this.travelService.createServiceTravel(travel);
  }

  @Post('finish')
  handlerFinishServiceTravel(@Body() travel: TravelDto) {
    return this.travelService.finishServiceTravel(travel);
  }
}
