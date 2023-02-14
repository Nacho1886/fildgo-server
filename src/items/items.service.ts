import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { User } from './../users/entities/user.entity';
import { Item } from './entities/item.entity';

import { CreateItemInput, UpdateItemInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';
import {
  createRepositoryByParentId,
  paginationConstruct,
} from 'src/common/functions';
import { findAllWithSearch } from '../common/functions/find-all-with-search.function';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    const newItem = createRepositoryByParentId(
      this.itemsRepository,
      createItemInput,
      user,
    );
    return await this.itemsRepository.save(newItem);
  }

  async findAll(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Item[]> {
    const { search } = searchArgs;

    const itemBuilder = this.itemsRepository.createQueryBuilder();

    const itemsPaginate = paginationConstruct(itemBuilder, paginationArgs);

    if (search)
      return await findAllWithSearch(itemsPaginate, searchArgs).getMany();

    return await itemsPaginate.getMany();
  }

  async findOne(term: string): Promise<Item> {
    const item = isUUID(term)
      ? await this.itemsRepository.findOneBy({ id: term })
      : await this.itemsRepository.findOneBy({ slug: term });

    if (!item)
      throw new NotFoundException(`Item with param: ${term} not found`);

    return item;
  }

  /* async update(
    id: string,
    updateItemInput: UpdateItemInput,
    user: User,
  ): Promise<Item> {
    await this.findOne(id, user);
    //? const item = await this.itemsRepository.preload({ ...updateItemInput, user });
    const item = await this.itemsRepository.preload(updateItemInput);

    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);

    return this.itemsRepository.save(item);
  }

  async remove(id: string, user: User): Promise<Item> {
    // TODO: soft delete, integridad referencial
    const item = await this.findOne(id, user);
    await this.itemsRepository.remove(item);
    return { ...item, id };
  }

  async itemCountByUser(user: User): Promise<number> {
    return this.itemsRepository.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  } */
}
