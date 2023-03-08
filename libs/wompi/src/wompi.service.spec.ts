import { Test, TestingModule } from '@nestjs/testing';
import { WompiService } from './wompi.service';
import { WompiModule } from './wompi.module';
import { Wompi } from './classes/wompi';
import { Request } from './classes/request';

describe('WompiService', () => {
  let service: WompiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WompiModule],
      providers: [WompiService, Wompi, Request],
    }).compile();

    service = module.get<WompiService>(WompiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
