import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsResolver } from './sessions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';

@Module({
  providers: [SessionsResolver, SessionsService],
  imports: [TypeOrmModule.forFeature([Session])],
  exports: [TypeOrmModule, SessionsService],
})
export class SessionsModule {}
