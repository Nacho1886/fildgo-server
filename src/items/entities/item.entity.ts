import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ValidTagItems, ValidQuantities } from '../enums';
import { User } from '../../users/entities/user.entity';
import { Farm } from '../../farms/entities/farm.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Image } from 'src/images/entities/image.entity';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  title: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field(() => String)
  slug: string;

  @Column('text')
  @Field(() => ValidTagItems)
  tag: ValidTagItems;

  @Column('text')
  @Field(() => ValidQuantities)
  quantity: ValidQuantities;

  @Column({ type: 'timestamp', name: 'created_at' })
  @Field(() => Date)
  CreatedAt: Date;

  @OneToMany(() => Post, (post) => post.item)
  @JoinColumn()
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => Image, (image) => image.item)
  @JoinColumn()
  @Field(() => [Image])
  images: Image[];

  @ManyToOne(() => User, (user) => user.items)
  @JoinColumn({ name: 'user_creator' })
  @Field(() => User)
  user: User;

  @Column({ type: 'timestamp', name: 'last_activity', nullable: true })
  @Field(() => Date, { nullable: true })
  lastActivity?: Date;

  @ManyToOne(() => User, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'last_activity_by' })
  @Field(() => User, { nullable: true })
  lastActivityBy?: User;

  @ManyToMany(() => Farm, (farm) => farm.items)
  @JoinTable()
  farms: Farm[];
}
