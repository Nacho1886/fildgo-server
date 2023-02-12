import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { CreateSessionInput, UpdateSessionInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { User } from './../users/entities/user.entity';
import { Session } from './entities/Session.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { findAllWithSearch, paginationConstruct } from 'src/common/functions';
import { searchByParentId } from '../common/functions/search-by-parent-id.function';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
  ) {}

  async create(
    createSessionInput: CreateSessionInput,
    user: User,
  ): Promise<Session> {
    const newSession = this.sessionsRepository.create({
      ...createSessionInput,
      user,
    });
    return await this.sessionsRepository.save(newSession);
  }

  async findAll(
    parent,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Session[]> {
    const { search } = searchArgs;

    const sessionBuilder = this.sessionsRepository.createQueryBuilder();

    const sessionsPaginate = paginationConstruct(
      sessionBuilder,
      paginationArgs,
    );

    const sessionWithParent = searchByParentId(sessionsPaginate, parent);

    if (search)
      return findAllWithSearch(sessionWithParent, searchArgs).getMany();

    return await sessionWithParent.getMany();
  }

  async findOne(id: string, parent): Promise<Session> {
    const sessionBuilder = this.sessionsRepository.createQueryBuilder();
    const session = searchByParentId(sessionBuilder, parent);

    if (!session)
      throw new NotFoundException(`Session with id: ${id} not found`);

    return session.getOne();
  }

  /* async update(
    id: string,
    updateSessionInput: UpdateSessionInput,
    user: User,
  ): Promise<Session> {
    await this.findOne(id, user);
    //? const Session = await this.sessionsRepository.preload({ ...updateSessionInput, user });
    const Session = await this.sessionsRepository.preload(updateSessionInput);

    if (!Session) throw new NotFoundException(`Session with id: ${id} not found`);

    return this.sessionsRepository.save(Session);
  }

  async remove(id: string, user: User): Promise<Session> {
    // TODO: soft delete, integridad referencial
    const Session = await this.findOne(id, user);
    await this.sessionsRepository.remove(Session);
    return { ...Session, id };
  }

  async SessionCountByUser(user: User): Promise<number> {
    return this.sessionsRepository.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  } */
}
