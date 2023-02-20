import { Injectable } from '@nestjs/common';
import { CreateFarmCategoryInput } from './dto/create-farm-category.input';
import { UpdateFarmCategoryInput } from './dto/update-farm-category.input';

@Injectable()
export class FarmCategoriesService {
  create(createFarmCategoryInput: CreateFarmCategoryInput) {
    return 'This action adds a new farmCategory';
  }

  findAll() {
    return `This action returns all farmCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farmCategory`;
  }

  update(id: number, updateFarmCategoryInput: UpdateFarmCategoryInput) {
    return `This action updates a #${id} farmCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmCategory`;
  }
}
