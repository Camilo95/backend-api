import { Test, TestingModule } from '@nestjs/testing';
import { WompiService } from './wompi.service';
import { WompiModule } from './wompi.module';

describe('WompiService', () => {
  let service: WompiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WompiModule],
      providers: [WompiService],
    }).compile();

    service = module.get<WompiService>(WompiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
