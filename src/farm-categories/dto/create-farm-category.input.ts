import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFarmCategoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
