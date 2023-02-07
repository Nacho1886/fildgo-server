import { Field, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class FollowUp {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'follower_id' })
  @Field(() => User)
  follows: User;

  @ManyToOne(() => User, (user) => user.userFollows)
  @JoinColumn({ name: 'follows_id' })
  @Field(() => User)
  followers: User;

  @Column('timestamp')
  @Field(() => Date)
  date: Date;
}
