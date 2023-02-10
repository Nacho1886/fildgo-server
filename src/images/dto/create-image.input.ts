import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateImageInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  url: string;

  @Field(() => String)
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @Field(() => String)
  @IsOptional()
  @IsUUID()
  farmId?: string;

  @Field(() => String)
  @IsOptional()
  @IsUUID()
  postId?: string;
}
