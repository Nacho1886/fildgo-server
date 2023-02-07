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

@Entity({ name: 'images' })
@ObjectType()
export class Image {
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
  url: string;

  @Column('timestamp')
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_updater' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Item, (item) => item.images)
  @JoinColumn()
  @Field(() => Item)
  item: Item;

  @ManyToOne(() => Farm, (farm) => farm.images)
  @JoinColumn()
  @Field(() => Farm)
  farm: Farm;
}
