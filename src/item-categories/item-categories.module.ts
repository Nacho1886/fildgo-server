import { Module } from '@nestjs/common';
import { ItemCategoriesService } from './item-categories.service';
import { ItemCategoriesResolver } from './item-categories.resolver';

@Module({
  providers: [ItemCategoriesResolver, ItemCategoriesService]
})
export class ItemCategoriesModule {}
