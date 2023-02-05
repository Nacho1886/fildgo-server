import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsResolver } from './farms.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';

@Module({
  providers: [FarmsResolver, FarmsService],
  imports: [TypeOrmModule.forFeature([Farm])],
})
export class FarmsModule {}
