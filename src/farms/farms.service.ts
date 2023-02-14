import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { User } from './../users/entities/user.entity';
import { Farm } from './entities/farm.entity';

import { CreateFarmInput, UpdateFarmInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';
import {
  createRepositoryByParentId,
  paginationConstruct,
} from 'src/common/functions';
import { findAllWithSearch } from '../common/functions/find-all-with-search.function';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmsRepository: Repository<Farm>,
  ) {}

  async create(createFarmInput: CreateFarmInput, user: User): Promise<Farm> {
    const newFarm = createRepositoryByParentId(
      this.farmsRepository,
      createFarmInput,
      user,
    );
    return await this.farmsRepository.save(newFarm);
  }

  async findAll(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Farm[]> {
    const { search } = searchArgs;

    const farmBuilder = this.farmsRepository.createQueryBuilder();

    const farmsPaginate = paginationConstruct(farmBuilder, paginationArgs);

    if (search)
      return await findAllWithSearch(farmsPaginate, searchArgs).getMany();

    return await farmsPaginate.getMany();
  }

  async findOne(term: string): Promise<Farm> {
    const farm = isUUID(term)
      ? await this.farmsRepository.findOneBy({ id: term })
      : await this.farmsRepository.findOneBy({ slug: term });

    if (!farm)
      throw new NotFoundException(`Farm with param: ${term} not found`);

    return farm;
  }

  /* async update(
    id: string,
    updateFarmInput: UpdateFarmInput,
    user: User,
  ): Promise<Farm> {
    await this.findOne(id, user);
    //? const farm = await this.farmsRepository.preload({ ...updateFarmInput, user });
    const farm = await this.farmsRepository.preload(updateFarmInput);

    if (!farm) throw new NotFoundException(`farm with id: ${id} not found`);

    return this.farmsRepository.save(farm);
  }

  async remove(id: string, user: User): Promise<Farm> {
    // TODO: soft delete, integridad referencial
    const farm = await this.findOne(id, user);
    await this.farmsRepository.remove(farm);
    return { ...farm, id };
  }

  async FarmCountByUser(user: User): Promise<number> {
    return this.farmsRepository.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  } */
}
