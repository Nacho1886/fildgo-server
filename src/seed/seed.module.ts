import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ItemsModule } from './../items/items.module';
import { UsersModule } from './../users/users.module';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { PostsModule } from '../posts/posts.module';
import { FarmsModule } from '../farms/farms.module';
import { SessionsModule } from '../sessions/sessions.module';
import { ImagesModule } from '../images/images.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [
    ConfigModule,
    ItemsModule,
    UsersModule,
    PostsModule,
    FarmsModule,
    SessionsModule,
    ImagesModule,
  ],
})
export class SeedModule {}
