import { Test, TestingModule } from '@nestjs/testing';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

// Modules
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '@Database/database';

// Dtos
import { TravelDto } from './dtos/travel.dto';
import { WompiModule } from '@wompi/wompi';

describe('TravelController', () => {
  let controller: TravelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule, WompiModule],
      controllers: [TravelController],
      providers: [TravelService],
    }).compile();

    controller = module.get<TravelController>(TravelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('start service travel', async () => {
    const coordenadas: TravelDto = {
      latitude: '5435345',
      longitude: '3454534',
    };
    await controller.handlerCreateServiceTravel(coordenadas);
    expect(controller).toBeDefined();
  });

  it('finish service travel', async () => {
    const coordenadas: TravelDto = {
      latitude: '5435345',
      longitude: '3454534',
    };
    await controller.handlerFinishServiceTravel(coordenadas);
    expect(controller).toBeDefined();
  });
});
