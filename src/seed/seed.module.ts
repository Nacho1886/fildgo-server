import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ItemsModule } from './../items/items.module';
import { UsersModule } from './../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { FarmsModule } from '../farms/farms.module';
import { SessionsModule } from '../sessions/sessions.module';
import { ImagesModule } from '../images/images.module';
import { ItemToFarmModule } from '../item-to-farm/item-to-farm.module';
import { FollowUpsModule } from 'src/follow-ups/follow-ups.module';
import { FarmCategoriesModule } from '../farm-categories/farm-categories.module';
import { ItemCategoriesModule } from '../item-categories/item-categories.module';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';

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
    ItemToFarmModule,
    FollowUpsModule,
    FarmCategoriesModule,
    ItemCategoriesModule,
  ],
})
export class SeedModule {}
