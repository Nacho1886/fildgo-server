import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
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

  @Column({ type: 'timestamp', name: 'date_created' })
  @Field(() => Date)
  CreatedAt: Date;

  @Column({ type: 'timestamp', name: 'reserved_date' })
  @Field(() => Date)
  reservedDate: Date;

  @Column({ type: 'text', name: 'type_session' })
  @Field(() => ValidTypeSsesion)
  typeSession: ValidTypeSsesion;

  @Column({ type: 'numeric', name: 'reserved_quantity' })
  @Field(() => Number)
  reservedQuantity: number;

  @Column({ type: 'boolean', name: 'is_completed', default: false })
  @Field(() => Boolean)
  isCompleted: boolean;

  @Column({ type: 'boolean', name: 'is_canceled', default: false })
  @Field(() => Boolean)
  isCanceled: boolean;

  @Column({ type: 'timestamp', name: 'last_activity', nullable: true })
  @Field(() => Date, { nullable: true })
  lastActivity?: Date;

  @ManyToOne(() => User, { nullable: true, lazy: true })
  @JoinColumn({ name: 'last_activity_by' })
  @Field(() => User, { nullable: true })
  lastActivityBy?: User;

  @ManyToOne(() => User, (user) => user.farms)
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Farm, (farm) => farm.sessions, { lazy: true })
  @JoinColumn({ name: 'farm_id' })
  @Field(() => Farm)
  farm: Farm;

  @OneToOne(() => Post, (post) => post.session, { nullable: true })
  post?: Post;

  @BeforeInsert()
  dateInsert() {
    this.CreatedAt = new Date();
  }

  @BeforeUpdate()
  dateUpdate() {
    this.lastActivity = new Date();
  }
}
