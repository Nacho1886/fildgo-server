import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sessions' })
@ObjectType()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('numeric')
  @Field(() => Number)
  stars: number;

  @Column('timestamp')
  @Field(() => Date)
  date: Date;

  @Column('numeric')
  @Field(() => Number)
  reserved_quantity: number;

  @Column('boolean')
  @Field(() => Boolean)
  isActive: boolean;

  @Column('boolean')
  @Field(() => Boolean)
  isCanceled: boolean;

  @ManyToOne(() => User, (user) => user.farms)
  @Field(() => User)
  user: User;
}
