import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  title: string;

  @Column('text')
  @Field(() => String)
  description: string;

  @Column('numeric')
  @Field(() => Number)
  stars: number;

  @Column('timestamp')
  @Field(() => Date)
  CreatedAt: Date;

  @Column('boolean')
  @Field(() => Boolean)
  isActive: boolean;
}
