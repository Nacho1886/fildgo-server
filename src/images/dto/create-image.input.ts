import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateImageInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  url: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  farmId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  postId?: string;
}
