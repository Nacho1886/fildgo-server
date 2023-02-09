import { InputType, Field } from '@nestjs/graphql';
import { ValidTypeSsesion } from '../enums/type-session.enum';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateSessionInput {
  @Field(() => ValidTypeSsesion)
  @IsNotEmpty()
  typeSession: ValidTypeSsesion;

  @Field(() => Number)
  @IsNumber()
  @Min(0)
  reservedQuantity: number;
}
