import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ValidTagItems, ValidQuantities } from '../enums';
import { User } from '../../users/entities/user.entity';
import { Farm } from '../../farms/entities/farm.entity';
import { Image } from 'src/images/entities/image.entity';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  name: string;

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
  quantityUnits: ValidQuantities;

  @Column({ type: 'boolean', name: 'is_active', default: false })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ type: 'timestamp', name: 'created_at' })
  @Field(() => Date)
  CreatedAt: Date;

  @ManyToOne(() => User, (user) => user.items)
  @JoinColumn({ name: 'user_creator' })
  @Field(() => User)
  user: User;

  @OneToMany(() => Image, (image) => image.item, { nullable: true })
  @JoinColumn()
  @Field(() => [Image], { nullable: true })
  images?: Image[];

  @Column({ type: 'timestamp', name: 'last_activity', nullable: true })
  @Field(() => Date, { nullable: true })
  lastActivity?: Date;

  @ManyToOne(() => User, { nullable: true, lazy: true })
  @JoinColumn({ name: 'last_activity_by' })
  @Field(() => User, { nullable: true })
  lastActivityBy?: User;

  @ManyToMany(() => Farm, (farm) => farm.items, { nullable: true })
  farms?: Farm[];

  @BeforeInsert()
  autoDataInsert() {
    this.slug = this.name;

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');

    this.CreatedAt = new Date();
  }

  @BeforeUpdate()
  autoDataUpdate() {
    this.slug = this.name;

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');

    this.lastActivity = new Date();
  }
}
