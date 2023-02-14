import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemToFarmService } from './item-to-farm.service';
import { ItemToFarm } from './entities/item-to-farm.entity';
import { CreateItemToFarmInput } from './dto/create-item-to-farm.input';

@Resolver(() => ItemToFarm)
export class ItemToFarmResolver {
  constructor(private readonly itemToFarmService: ItemToFarmService) {}

  @Mutation(() => ItemToFarm)
  createItemToFarm(
    @Args('createItemInput') createItemToFarmInput: CreateItemToFarmInput,
    // @CurrentUser() user: User,
  ): Promise<ItemToFarm> {
    return this.itemToFarmService.create(createItemToFarmInput);
  }

  @Query(() => [ItemToFarm], { name: 'itemToFarm' })
  findAll() {
    return this.itemToFarmService.findAll();
  }

  @Query(() => ItemToFarm, { name: 'itemToFarm' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemToFarmService.findOne(id);
  }

  @Mutation(() => ItemToFarm)
  removeItemToFarm(@Args('id', { type: () => Int }) id: number) {
    return this.itemToFarmService.remove(id);
  }
}
