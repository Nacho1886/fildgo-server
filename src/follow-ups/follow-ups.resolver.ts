import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowUpsService } from './follow-ups.service';
import { FollowUp } from './entities/follow-up.entity';
import { CreateFollowUpInput } from './dto/create-follow-up.input';
import { UpdateFollowUpInput } from './dto/update-follow-up.input';

@Resolver(() => FollowUp)
export class FollowUpsResolver {
  constructor(private readonly followUpsService: FollowUpsService) {}

  @Mutation(() => FollowUp)
  createFollowUp(@Args('createFollowUpInput') createFollowUpInput: CreateFollowUpInput) {
    return this.followUpsService.create(createFollowUpInput);
  }

  @Query(() => [FollowUp], { name: 'followUps' })
  findAll() {
    return this.followUpsService.findAll();
  }

  @Query(() => FollowUp, { name: 'followUp' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followUpsService.findOne(id);
  }

  @Mutation(() => FollowUp)
  updateFollowUp(@Args('updateFollowUpInput') updateFollowUpInput: UpdateFollowUpInput) {
    return this.followUpsService.update(updateFollowUpInput.id, updateFollowUpInput);
  }

  @Mutation(() => FollowUp)
  removeFollowUp(@Args('id', { type: () => Int }) id: number) {
    return this.followUpsService.remove(id);
  }
}
