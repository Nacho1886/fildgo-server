import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { ValidRoles } from '../../auth/enums/valid-roles.enum';
import { Item } from '../../items/entities/item.entity';
import { Farm } from '../../farms/entities/farm.entity';
import { Session } from '../../sessions/entities/session.entity';
import { FollowUp } from './follow-up.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  name: string;

  @Column('text')
  @Field(() => String)
  lastname: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field(() => String)
  username: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field(() => String)
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  @Field(() => Date)
  CreatedAt: Date;

  @Column({ type: 'timestamp', name: 'last_activity' })
  @Field(() => Date)
  lastActivity: Date;

  @Column({
    type: 'text',
    array: true,
    default: [ValidRoles.user],
  })
  @Field(() => [ValidRoles])
  roles: ValidRoles[];

  @Column({
    type: 'boolean',
    name: 'is_active',
    default: true,
  })
  @Field(() => Boolean)
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.userChangedBy, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'changes_by' })
  @Field(() => User, { nullable: true })
  userChangedBy?: User;

  @OneToMany(() => Item, (item) => item.user, { lazy: true })
  @Field(() => [Item])
  items: Item[];

  @OneToMany(() => Farm, (farm) => farm.user, { lazy: true })
  @Field(() => [Farm])
  farms: Farm[];

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn()
  @Field(() => [Post])
  posts: Post[];

  @OneToMany(() => Session, (session) => session.user, { lazy: true })
  @Field(() => [Session])
  sessions: Session[];

  /* @OneToMany(() => Item, (item) => item.follows)
  @JoinColumn({ name: 'item_follows' })
  itemFollows: Item[];

  @OneToMany(() => Farm, (farm) => farm.follows)
  @JoinColumn({ name: 'farm_follows' })
  farmFollows: Farm[];

  @OneToMany(() => FollowUp, (followUp) => followUp.follows)
  @JoinColumn({ name: 'user_follows' })
  userFollows: FollowUp[];

  @OneToMany(() => FollowUp, (followUp) => followUp.followers)
  @JoinColumn()
  followers: FollowUp[]; */

  // Location
}
