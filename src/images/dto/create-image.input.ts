import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateImageInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  url: string;
}
