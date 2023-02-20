import { Test, TestingModule } from '@nestjs/testing';
import { FarmCategoriesService } from './farm-categories.service';

describe('FarmCategoriesService', () => {
  let service: FarmCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmCategoriesService],
    }).compile();

    service = module.get<FarmCategoriesService>(FarmCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
