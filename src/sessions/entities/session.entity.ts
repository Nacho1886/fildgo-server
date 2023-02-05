import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
