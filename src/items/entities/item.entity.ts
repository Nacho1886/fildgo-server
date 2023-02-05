import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ValidTagItems, ValidQuantities } from '../enums';

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
}
