import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ValidRoles } from '../../auth/enums/valid-roles.enum';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  name: string;

  @Column('text')
  @Field(() => String)
  lastname: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field(() => String)
  username: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field(() => String)
  email: string;

  @Column('text')
  password: string;

  @Column('timestamp')
  @Field(() => Date)
  CreatedAt: Date;

  @Column('timestamp')
  @Field(() => Date)
  lastActivity: Date;

  @Column({
    type: 'text',
    array: true,
    default: [ValidRoles.user],
  })
  @Field(() => [ValidRoles])
  roles: ValidRoles[];

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean)
  isActive: boolean;
}
