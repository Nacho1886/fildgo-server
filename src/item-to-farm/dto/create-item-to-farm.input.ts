import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateItemToFarmInput {
  @Field(() => ID)
  @IsUUID()
  itemId: string;

  @Field(() => ID)
  @IsUUID()
  farmId: string;
}
