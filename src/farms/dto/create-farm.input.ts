import { InputType, Field } from '@nestjs/graphql';
import { ValidTagFarms } from '../enums/tag-farm.enum';

@InputType()
export class CreateFarmInput {
  @Field(() => String)
  name: string;

  @Field(() => [ValidTagFarms])
  tags: ValidTagFarms[];
}
