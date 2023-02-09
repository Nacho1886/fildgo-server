import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Farm } from 'src/farms/entities/farm.entity';
import { ValidTypeSsesion } from '../enums/type-session.enum';
import { Post } from 'src/posts/entities/post.entity';

@Entity({ name: 'sessions' })
@ObjectType()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('timestamp')
  @Field(() => Date)
  date: Date;

  @Column({ type: 'text', name: 'type_session' })
  @Field(() => ValidTypeSsesion)
  typeSession: ValidTypeSsesion;

  @Column({ type: 'numeric', name: 'reserved_quantity' })
  @Field(() => Number)
  reservedQuantity: number;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ type: 'boolean', name: 'is_canceled', default: true })
  @Field(() => Boolean)
  isCanceled: boolean;

  @ManyToOne(() => User, (user) => user.farms)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Farm, (farm) => farm.sessions)
  @Field(() => Farm)
  farm: Farm;

  @OneToOne(() => Post, (post) => post.session)
  @JoinColumn()
  @Field(() => Post)
  post: Post;
}
