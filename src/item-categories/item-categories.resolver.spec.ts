import { Test, TestingModule } from '@nestjs/testing';
import { ItemCategoriesResolver } from './item-categories.resolver';
import { ItemCategoriesService } from './item-categories.service';

describe('ItemCategoriesResolver', () => {
  let resolver: ItemCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemCategoriesResolver, ItemCategoriesService],
    }).compile();

    resolver = module.get<ItemCategoriesResolver>(ItemCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
