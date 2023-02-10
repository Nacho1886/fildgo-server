import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Farm } from 'src/farms/entities/farm.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities';
import { Post } from 'src/posts/entities/post.entity';

@Entity({ name: 'images' })
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field(() => String)
  url: string;

  @Column({ type: 'timestamp', name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'user_updater' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Item, (item) => item.images, { nullable: true, lazy: true })
  @JoinColumn()
  @Field(() => Item, { nullable: true })
  item?: Item;

  @ManyToOne(() => Farm, (farm) => farm.images, { nullable: true, lazy: true })
  @JoinColumn()
  @Field(() => Farm, { nullable: true })
  farm?: Farm;

  @ManyToOne(() => Post, (post) => post.images, { nullable: true, lazy: true })
  @JoinColumn()
  @Field(() => Post, { nullable: true })
  post?: Post;
}
