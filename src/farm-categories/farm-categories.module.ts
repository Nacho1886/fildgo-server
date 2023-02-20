import { Module } from '@nestjs/common';
import { FarmCategoriesService } from './farm-categories.service';
import { FarmCategoriesResolver } from './farm-categories.resolver';

@Module({
  providers: [FarmCategoriesResolver, FarmCategoriesService]
})
export class FarmCategoriesModule {}
