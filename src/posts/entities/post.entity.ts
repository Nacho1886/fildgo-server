import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { Farm } from 'src/farms/entities/farm.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities';

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

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_creator' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Farm, (farm) => farm.posts)
  @JoinColumn()
  @Field(() => Farm)
  farm: Farm;

  @ManyToOne(() => Item, (item) => item.posts)
  @JoinColumn()
  @Field(() => Item)
  item: Item;
}
