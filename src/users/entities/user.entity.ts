import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ValidRoles } from '../../auth/enums/valid-roles.enum';
import { Item } from '../../items/entities/item.entity';
import { Farm } from '../../farms/entities/farm.entity';
import { Session } from '../../sessions/entities/session.entity';

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

  @Column('timestamp')
  @Field(() => Date)
  CreatedAt: Date;

  @Column('timestamp')
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
    default: true,
  })
  @Field(() => Boolean)
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.userChangedBy, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'userChangedBy' })
  @Field(() => User, { nullable: true })
  userChangedBy?: User;

  @OneToMany(() => Item, (item) => item.user, { lazy: true })
  @JoinColumn({ name: 'items' })
  @Field(() => [Item])
  items: Item[];

  @OneToMany(() => Farm, (farm) => farm.user, { lazy: true })
  @Field(() => [Farm])
  farms: Farm[];

  @OneToMany(() => Session, (session) => session.user, { lazy: true })
  @Field(() => [Session])
  sessions: Session[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  follows: User[];

  @ManyToMany(() => User, (user) => user.follows)
  followers: User[];
}
