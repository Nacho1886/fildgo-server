import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FarmsService } from './farms.service';
import { FarmsResolver } from './farms.resolver';
import { Farm } from './entities/farm.entity';

@Module({
  providers: [FarmsResolver, FarmsService],
  imports: [TypeOrmModule.forFeature([Farm])],
  exports: [TypeOrmModule, FarmsService],
})
export class FarmsModule {}
