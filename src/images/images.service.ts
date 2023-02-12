import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { CreateImageInput, UpdateImageInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { User } from './../users/entities/user.entity';
import { Image } from './entities/image.entity';
import { findAllWithSearch, paginationConstruct } from 'src/common/functions';
import { searchByParentId } from '../common/functions/search-by-parent-id.function';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly ImagesRepository: Repository<Image>,
  ) {}

  async create(createImageInput: CreateImageInput, user: User): Promise<Image> {
    const newImage = this.ImagesRepository.create({
      ...createImageInput,
      user,
    });
    return await this.ImagesRepository.save(newImage);
  }

  async findAll(
    parent,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Image[]> {
    const { search } = searchArgs;

    const ImageBuilder = this.ImagesRepository.createQueryBuilder();

    const ImagesPaginate = paginationConstruct(ImageBuilder, paginationArgs);

    const ImageWithParent = searchByParentId(ImagesPaginate, parent);

    if (search) return findAllWithSearch(ImageWithParent, searchArgs).getMany();

    return await ImageWithParent.getMany();
  }

  async findOne(id: string, parent): Promise<Image> {
    const ImageBuilder = this.ImagesRepository.createQueryBuilder();
    const Image = searchByParentId(ImageBuilder, parent);

    if (!Image) throw new NotFoundException(`Image with id: ${id} not found`);

    return Image.getOne();
  }

  /* async update(
    id: string,
    updateImageInput: UpdateImageInput,
    user: User,
  ): Promise<Image> {
    await this.findOne(id, user);
    //? const Image = await this.ImagesRepository.preload({ ...updateImageInput, user });
    const Image = await this.ImagesRepository.preload(updateImageInput);

    if (!Image) throw new NotFoundException(`Image with id: ${id} not found`);

    return this.ImagesRepository.save(Image);
  }

  async remove(id: string, user: User): Promise<Image> {
    // TODO: soft delete, integridad referencial
    const Image = await this.findOne(id, user);
    await this.ImagesRepository.remove(Image);
    return { ...Image, id };
  }

  async ImageCountByUser(user: User): Promise<number> {
    return this.ImagesRepository.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  } */
}
