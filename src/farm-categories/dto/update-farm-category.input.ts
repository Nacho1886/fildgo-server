import { CreateFarmCategoryInput } from './create-farm-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFarmCategoryInput extends PartialType(CreateFarmCategoryInput) {
  @Field(() => Int)
  id: number;
}
