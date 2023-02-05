import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFarmInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
