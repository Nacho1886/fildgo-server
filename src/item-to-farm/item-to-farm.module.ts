import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { FarmsModule } from '../farms/farms.module';
import { ItemsModule } from '../items/items.module';

import { ItemToFarmService } from './item-to-farm.service';
import { ItemToFarmResolver } from './item-to-farm.resolver';
import { ItemToFarm } from './entities/item-to-farm.entity';

@Module({
  providers: [ItemToFarmResolver, ItemToFarmService],
  imports: [
    TypeOrmModule.forFeature([ItemToFarm]),
    UsersModule,
    FarmsModule,
    ItemsModule,
  ],
  exports: [TypeOrmModule, ItemToFarmService],
})
export class ItemToFarmModule {}
