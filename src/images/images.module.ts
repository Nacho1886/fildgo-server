import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesResolver } from './images.resolver';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';

@Module({
  providers: [ImagesResolver, ImagesService],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImagesModule {}
