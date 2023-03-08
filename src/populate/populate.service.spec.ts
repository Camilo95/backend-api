import { Test, TestingModule } from '@nestjs/testing';
import { PopulateService } from './populate.service';
import { DatabaseModule } from '@Database/database';
import { PopulateModule } from './populate.module';

describe('PopulateService', () => {
  let service: PopulateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PopulateModule, DatabaseModule],
      providers: [PopulateService],
    }).compile();

    service = module.get<PopulateService>(PopulateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
