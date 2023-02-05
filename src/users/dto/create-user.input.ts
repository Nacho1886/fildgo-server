import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsName } from 'src/common/constraints/is-name.constraint';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsName()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsName()
  lastname: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field(() => String)
  @IsStrongPassword({
    minSymbols: 0,
  })
  password: string;
}
