import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFarmInput, UpdateFarmInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { User } from './../users/entities/user.entity';
import { Farm } from './entities/farm.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmsRepository: Repository<Farm>,
  ) {}

  async create(createFarmInput: CreateFarmInput, user: User): Promise<Farm> {
    const newFarm = this.farmsRepository.create({ ...createFarmInput, user });
    return await this.farmsRepository.save(newFarm);
  }

  async findAll(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Farm[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.farmsRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere('LOWER(name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return queryBuilder.getMany();
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
