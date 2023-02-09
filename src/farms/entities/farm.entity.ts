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
  tags: ValidTagFarms[];

  @Column('boolean')
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

  @ManyToOne(() => User, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'last_activity_by' })
  @Field(() => User, { nullable: true })
  lastActivityBy?: User;

  @OneToMany(() => Post, (post) => post.farm)
  @JoinColumn()
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => Image, (image) => image.farm)
  @JoinColumn()
  @Field(() => [Image])
  images: Image[];

  @OneToMany(() => Session, (session) => session.farm)
  @JoinColumn()
  @Field(() => [Session])
  sessions: Session[];

  @ManyToMany(() => Item, (item) => item.farms)
  items: Item[];
}
