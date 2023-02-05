import { CreateFollowUpInput } from './create-follow-up.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFollowUpInput extends PartialType(CreateFollowUpInput) {
  @Field(() => Int)
  id: number;
}
