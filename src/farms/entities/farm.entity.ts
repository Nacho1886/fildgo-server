import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ValidTagFarms } from '../enums/tag-farm.enum';

@Entity({ name: 'farms' })
@ObjectType()
export class Farm {
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

  @Column({
    type: 'text',
    array: true,
  })
  @Field(() => [ValidTagFarms])
  tags: [ValidTagFarms];

  @Column('timestamp')
  @Field(() => Date)
  CreatedAt: Date;

  @Column('timestamp')
  @Field(() => Date)
  lastActivity: Date;

  @Column('boolean')
  @Field(() => Boolean)
  isActive: boolean;
}
