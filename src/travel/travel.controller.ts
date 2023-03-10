import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelDto } from './dtos/travel.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post('start')
  async handlerCreateServiceTravel(@Body() travel: TravelDto) {
    return await this.travelService.createServiceTravel(travel);
  }

  @Post('finish')
  async handlerFinishServiceTravel(@Body() travel: TravelDto) {
    return await this.travelService.finishServiceTravel(travel);
  }
}
