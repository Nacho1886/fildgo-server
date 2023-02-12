import { InputType, Field, ID } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  stars: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @Field(() => ID)
  @IsUUID()
  sessionId: string;
}
