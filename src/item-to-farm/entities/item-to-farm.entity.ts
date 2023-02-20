import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';

import { Item } from 'src/items/entities/item.entity';
import { Farm } from 'src/farms/entities/farm.entity';

@Entity({ name: 'item_to_farm' })
@ObjectType()
export class ItemToFarm {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('timestamp')
  @Field(() => Date)
  date: Date;

  @ManyToOne(() => Item, { lazy: true })
  @JoinColumn({ name: 'item_id' })
  @Field(() => Item)
  item: Item;

  @ManyToOne(() => Farm, { lazy: true })
  @JoinColumn({ name: 'farm_id' })
  @Field(() => Farm)
  farm: Farm;

  @BeforeInsert()
  dateInsert() {
    this.date = new Date();
  }
}
