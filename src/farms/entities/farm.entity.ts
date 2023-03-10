import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidTagFarms } from '../enums/tag-farm.enum';
import { User } from 'src/users/entities/user.entity';
import { Item } from '../../items/entities/item.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Image } from 'src/images/entities/image.entity';
import { Session } from '../../sessions/entities/session.entity';

@Entity({ name: 'farms' })
@ObjectType()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  name: string;

  @Column({ type: 'text', unique: true })
  @Field(() => String)
  slug: string;

  @Column({ type: 'text', array: true })
  @Field(() => [ValidTagFarms])
  tags: ValidTagFarms[];

  @Column({ type: 'boolean', name: 'is_active', default: false })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ type: 'timestamp', name: 'created_at' })
  @Field(() => Date)
  CreatedAt: Date;

  @ManyToOne(() => User, (user) => user.farms)
  @JoinColumn({ name: 'user_owner' })
  @Field(() => User)
  user: User;

  @Column({ type: 'timestamp', name: 'last_activity', nullable: true })
  @Field(() => Date, { nullable: true })
  lastActivity?: Date;

  @ManyToOne(() => User, { nullable: true, lazy: true })
  @JoinColumn({ name: 'last_activity_by' })
  @Field(() => User, { nullable: true })
  lastActivityBy?: User;

  @OneToMany(() => Image, (image) => image.farm, { nullable: true })
  @JoinColumn()
  @Field(() => [Image], { nullable: true })
  images?: Image[];

  @OneToMany(() => Session, (session) => session.farm, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  @Field(() => [Session], { nullable: true })
  sessions?: Session[];

  @ManyToMany(() => Item, (item) => item.farms, { nullable: true })
  @JoinTable({
    name: 'farms_items',
    joinColumn: {
      name: 'farm_id',
    },
    inverseJoinColumn: {
      name: 'item_id',
    },
  })
  items?: Item[];

  @BeforeInsert()
  autoDataInsert() {
    this.slug = this.name;

    this.slug = this.slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f\s'".????]/g, '');

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
