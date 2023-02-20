import { Test, TestingModule } from '@nestjs/testing';
import { FarmCategoriesResolver } from './farm-categories.resolver';
import { FarmCategoriesService } from './farm-categories.service';

describe('FarmCategoriesResolver', () => {
  let resolver: FarmCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmCategoriesResolver, FarmCategoriesService],
    }).compile();

    resolver = module.get<FarmCategoriesResolver>(FarmCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
