import { Test, TestingModule } from '@nestjs/testing';
import { TravelService } from './travel.service';

// Modules
import { TravelModule } from './travel.module';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '@Database/database';
import { WompiModule } from '@wompi/wompi';

describe('TravelService', () => {
  let service: TravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TravelModule, UserModule, DatabaseModule, WompiModule],
      providers: [TravelService],
    }).compile();

    service = module.get<TravelService>(TravelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
