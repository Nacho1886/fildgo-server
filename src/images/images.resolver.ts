import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => Image)
  createImage(@Args('createImageInput') createImageInput: CreateImageInput) {
    return this.imagesService.create(createImageInput);
  }

  @Query(() => [Image], { name: 'images' })
  findAll() {
    return this.imagesService.findAll();
  }

  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => Image)
  updateImage(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
    return this.imagesService.update(updateImageInput.id, updateImageInput);
  }

  @Mutation(() => Image)
  removeImage(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.remove(id);
  }
}
