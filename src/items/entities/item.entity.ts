import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ValidTagItems, ValidQuantities } from '../enums';
import { User } from '../../users/entities/user.entity';

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

  @Column('timestamp')
  @Field(() => Date)
  CreatedAt: Date;

  @Column('timestamp')
  @Field(() => Date)
  lastActivity: Date;

  @ManyToOne(() => User, (user) => user.items)
  @Field(() => User)
  user: User;
}
