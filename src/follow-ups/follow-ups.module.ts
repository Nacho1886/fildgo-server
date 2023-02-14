import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { FarmsModule } from '../farms/farms.module';
import { ItemsModule } from '../items/items.module';

import { FollowUpsService } from './follow-ups.service';
import { FollowUpsResolver } from './follow-ups.resolver';
import { FollowUp } from './entities/follow-up.entity';

@Module({
  providers: [FollowUpsResolver, FollowUpsService],
  imports: [
    TypeOrmModule.forFeature([FollowUp]),
    UsersModule,
    FarmsModule,
    ItemsModule,
  ],
  exports: [TypeOrmModule, FollowUpsService],
})
export class FollowUpsModule {}
