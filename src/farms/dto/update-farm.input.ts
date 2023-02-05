import { CreateFarmInput } from './create-farm.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFarmInput extends PartialType(CreateFarmInput) {
  @Field(() => Int)
  id: number;
}
