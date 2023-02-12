import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Farm } from 'src/farms/entities/farm.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities';
import { Session } from 'src/sessions/entities/session.entity';
import { Image } from 'src/images/entities/image.entity';

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

  @Column({ type: 'boolean', name: 'is_active', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ type: 'timestamp', name: 'created_at' })
  @Field(() => Date)
  CreatedAt: Date;

  @Column({ type: 'timestamp', name: 'last_activity', nullable: true })
  @Field(() => Date, { nullable: true })
  lastActivity?: Date;

  @ManyToOne(() => User, { nullable: true, lazy: true })
  @JoinColumn({ name: 'last_activity_by' })
  @Field(() => User, { nullable: true })
  lastActivityBy?: User;

  @ManyToOne(() => User, (user) => user.posts, { lazy: true })
  @JoinColumn({ name: 'user_creator' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Farm, (farm) => farm.posts, { lazy: true })
  @JoinColumn()
  @Field(() => Farm)
  farm: Farm;

  @ManyToOne(() => Item, (item) => item.posts, { lazy: true })
  @JoinColumn()
  @Field(() => Item)
  item: Item;

  @OneToMany(() => Image, (image) => image.post, { nullable: true, lazy: true })
  @Field(() => Image, { nullable: true })
  images: Image[];

  @OneToOne(() => Session, (session) => session.post, { lazy: true })
  @JoinColumn()
  @Field(() => Session)
  session: Session;

  @BeforeInsert()
  dateInsert() {
    this.CreatedAt = new Date();
  }

  @BeforeUpdate()
  dateUpdate() {
    this.lastActivity = new Date();
  }
}
