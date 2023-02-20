import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemCategoriesService } from './item-categories.service';
import { ItemCategory } from './entities/item-category.entity';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';

@Resolver(() => ItemCategory)
export class ItemCategoriesResolver {
  constructor(private readonly itemCategoriesService: ItemCategoriesService) {}

  @Mutation(() => ItemCategory)
  createItemCategory(@Args('createItemCategoryInput') createItemCategoryInput: CreateItemCategoryInput) {
    return this.itemCategoriesService.create(createItemCategoryInput);
  }

  @Query(() => [ItemCategory], { name: 'itemCategories' })
  findAll() {
    return this.itemCategoriesService.findAll();
  }

  @Query(() => ItemCategory, { name: 'itemCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemCategoriesService.findOne(id);
  }

  @Mutation(() => ItemCategory)
  updateItemCategory(@Args('updateItemCategoryInput') updateItemCategoryInput: UpdateItemCategoryInput) {
    return this.itemCategoriesService.update(updateItemCategoryInput.id, updateItemCategoryInput);
  }

  @Mutation(() => ItemCategory)
  removeItemCategory(@Args('id', { type: () => Int }) id: number) {
    return this.itemCategoriesService.remove(id);
  }
}
