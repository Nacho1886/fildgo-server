import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FarmCategoriesService } from './farm-categories.service';
import { FarmCategory } from './entities/farm-category.entity';
import { CreateFarmCategoryInput } from './dto/create-farm-category.input';
import { UpdateFarmCategoryInput } from './dto/update-farm-category.input';

@Resolver(() => FarmCategory)
export class FarmCategoriesResolver {
  constructor(private readonly farmCategoriesService: FarmCategoriesService) {}

  @Mutation(() => FarmCategory)
  createFarmCategory(@Args('createFarmCategoryInput') createFarmCategoryInput: CreateFarmCategoryInput) {
    return this.farmCategoriesService.create(createFarmCategoryInput);
  }

  @Query(() => [FarmCategory], { name: 'farmCategories' })
  findAll() {
    return this.farmCategoriesService.findAll();
  }

  @Query(() => FarmCategory, { name: 'farmCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.farmCategoriesService.findOne(id);
  }

  @Mutation(() => FarmCategory)
  updateFarmCategory(@Args('updateFarmCategoryInput') updateFarmCategoryInput: UpdateFarmCategoryInput) {
    return this.farmCategoriesService.update(updateFarmCategoryInput.id, updateFarmCategoryInput);
  }

  @Mutation(() => FarmCategory)
  removeFarmCategory(@Args('id', { type: () => Int }) id: number) {
    return this.farmCategoriesService.remove(id);
  }
}
