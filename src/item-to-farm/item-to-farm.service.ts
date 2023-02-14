import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateItemToFarmInput } from './dto/create-item-to-farm.input';
import { ItemToFarm } from './entities/item-to-farm.entity';
import { createRepositoryByParentId } from 'src/common/functions';

@Injectable()
export class ItemToFarmService {
  constructor(
    @InjectRepository(ItemToFarm)
    private readonly ItemToFarmsRepository: Repository<ItemToFarm>,
  ) {}

  async create(
    createItemToFarmInput: CreateItemToFarmInput,
  ): Promise<ItemToFarm> {
    /* const item = await this.itemsRepository.findOneBy({ id: itemId });
    const farm = await this.farmsRepository.findOneBy({ id: farmId });
    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found`);
    }
    if (!farm) {
      throw new NotFoundException(`Farm with ID ${farmId} not found`);
    }
    item.farms = [...item.farms, farm];
    return this.itemsRepository.save(item); */
    const newItemToFarm = createRepositoryByParentId(
      this.ItemToFarmsRepository,
      createItemToFarmInput,
    );
    console.log(
      '🚀 ~ file: item-to-farm.service.ts:31 ~ ItemToFarmService ~ create ~ newItemToFarm',
      newItemToFarm,
    );
    return await this.ItemToFarmsRepository.save(newItemToFarm);
  }

  findAll() {
    return `This action returns all itemToFarm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemToFarm`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemToFarm`;
  }
}
