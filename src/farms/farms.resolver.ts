import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
// import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

import { FarmsService } from './farms.service';

import { Farm } from './entities/farm.entity';
import { User } from './../users/entities/user.entity';

import { CreateFarmInput, UpdateFarmInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Farm)
// @UseGuards(JwtAuthGuard)
export class FarmsResolver {
  constructor(private readonly farmsService: FarmsService) {}

  @Mutation(() => Farm, { name: 'createFarm' })
  async createFarm(
    @Args('createFarmInput') createFarmInput: CreateFarmInput,
    @CurrentUser() user: User,
  ): Promise<Farm> {
    return this.farmsService.create(createFarmInput, user);
  }

  @Query(() => [Farm], { name: 'Farms' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Farm[]> {
    return this.farmsService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => Farm, { name: 'Farm' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Farm> {
    return this.farmsService.findOne(id);
  }

  /* @Mutation(() => Farm)
  updateFarm(
    @Args('updateFarmInput') updateFarmInput: UpdateFarmInput,
    @CurrentUser() user: User,
  ): Promise<Farm> {
    return this.farmsService.update(updateFarmInput.id, updateFarmInput, user);
  }

  @Mutation(() => Farm)
  removeFarm(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<Farm> {
    return this.farmsService.remove(id, user);
  } */
}
