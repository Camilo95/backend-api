import { Body, Controller, Post } from '@nestjs/common';
import { PopulateService } from './populate.service';

// Dtos
import { UserDto } from './dtos';

@Controller('populate')
export class PopulateController {
  constructor(private readonly populateService: PopulateService) {}

  @Post('/users')
  async handlerPopulateUsers(@Body() users: UserDto) {
    return await this.populateService.populateUsers(users.data);
  }
}
