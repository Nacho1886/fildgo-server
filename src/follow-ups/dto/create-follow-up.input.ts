import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFollowUpInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
