import { Field, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Item } from 'src/items/entities/item.entity';
import { Farm } from 'src/farms/entities/farm.entity';

@Entity()
export class FollowUp {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('timestamp')
  @Field(() => Date)
  date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'follower_id' })
  @Field(() => User)
  follower: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'followed_user_id' })
  @Field(() => User, { nullable: true })
  followedUser: User;

  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn({ name: 'followed_item_id' })
  @Field(() => Item, { nullable: true })
  followedItem: Item;

  @ManyToOne(() => Farm, { nullable: true })
  @JoinColumn({ name: 'followed_farm_id' })
  @Field(() => Farm, { nullable: true })
  followedFarm: Farm;
}
