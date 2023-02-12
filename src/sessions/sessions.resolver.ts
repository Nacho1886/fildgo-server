import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID, Parent } from '@nestjs/graphql';
// import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

import { SessionsService } from './sessions.service';

import { Session } from './entities/session.entity';
import { User } from './../users/entities/user.entity';

import { CreateSessionInput, UpdateSessionInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Session)
// @UseGuards(JwtAuthGuard)
export class SessionsResolver {
  constructor(private readonly SessionsService: SessionsService) {}

  @Mutation(() => Session, { name: 'createSession' })
  async createSession(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
    @CurrentUser() user: User,
  ): Promise<Session> {
    return this.SessionsService.create(createSessionInput, user);
  }

  @Query(() => [Session], { name: 'Sessions' })
  async findAll(
    @Parent() parent,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Session[]> {
    return this.SessionsService.findAll(parent, paginationArgs, searchArgs);
  }

  @Query(() => Session, { name: 'Session' })
  async findOne(
    @Parent() parent,
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Session> {
    return this.SessionsService.findOne(id, parent);
  }

  /* @Mutation(() => Session)
  updateSession(
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
    @CurrentUser() user: User,
  ): Promise<Session> {
    return this.SessionsService.update(updateSessionInput.id, updateSessionInput, user);
  }

  @Mutation(() => Session)
  removeSession(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<Session> {
    return this.SessionsService.remove(id, user);
  } */
}
