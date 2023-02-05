import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FarmsService } from './farms.service';
import { Farm } from './entities/farm.entity';
import { CreateFarmInput } from './dto/create-farm.input';
import { UpdateFarmInput } from './dto/update-farm.input';

@Resolver(() => Farm)
export class FarmsResolver {
  constructor(private readonly farmsService: FarmsService) {}

  @Mutation(() => Farm)
  createFarm(@Args('createFarmInput') createFarmInput: CreateFarmInput) {
    return this.farmsService.create(createFarmInput);
  }

  @Query(() => [Farm], { name: 'farms' })
  findAll() {
    return this.farmsService.findAll();
  }

  @Query(() => Farm, { name: 'farm' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.farmsService.findOne(id);
  }

  @Mutation(() => Farm)
  updateFarm(@Args('updateFarmInput') updateFarmInput: UpdateFarmInput) {
    return this.farmsService.update(updateFarmInput.id, updateFarmInput);
  }

  @Mutation(() => Farm)
  removeFarm(@Args('id', { type: () => Int }) id: number) {
    return this.farmsService.remove(id);
  }
}
