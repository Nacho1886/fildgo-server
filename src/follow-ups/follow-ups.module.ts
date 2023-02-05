import { Module } from '@nestjs/common';
import { FollowUpsService } from './follow-ups.service';
import { FollowUpsResolver } from './follow-ups.resolver';

@Module({
  providers: [FollowUpsResolver, FollowUpsService]
})
export class FollowUpsModule {}
