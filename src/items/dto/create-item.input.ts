import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ValidQuantities, ValidTagItems } from '../enums';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => ValidTagItems)
  @IsNotEmpty()
  tag: ValidTagItems;

  @Field(() => ValidQuantities)
  @IsNotEmpty()
  quantityUnits: ValidQuantities;
}
