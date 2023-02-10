import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

import { ValidTypeSsesion } from '../enums/type-session.enum';

@InputType()
export class CreateSessionInput {
  @Field(() => Date)
  @IsDate()
  dateReserved: Date;

  @Field(() => ValidTypeSsesion)
  @IsNotEmpty()
  typeSession: ValidTypeSsesion;

  @Field(() => Number)
  @IsNumber()
  @Min(0)
  reservedQuantity: number;

  @Field(() => ID)
  @IsUUID()
  farmId: string;

  @Field(() => ID)
  @IsUUID()
  itemId: string;
}
