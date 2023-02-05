import { Injectable } from '@nestjs/common';
import { CreateFarmInput } from './dto/create-farm.input';
import { UpdateFarmInput } from './dto/update-farm.input';

@Injectable()
export class FarmsService {
  create(createFarmInput: CreateFarmInput) {
    return 'This action adds a new farm';
  }

  findAll() {
    return `This action returns all farms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farm`;
  }

  update(id: number, updateFarmInput: UpdateFarmInput) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
