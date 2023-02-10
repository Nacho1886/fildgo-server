import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { CreateSessionInput, UpdateSessionInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { User } from './../users/entities/user.entity';
import { Session } from './entities/Session.entity';
import { Farm } from 'src/farms/entities/farm.entity';

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

  async findAllByUser(
    user: User,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Session[]> {
    const { search } = searchArgs;

    const sessionsQueryBuilder = this.findAllConstruction(paginationArgs);
    sessionsQueryBuilder.where(`"userId" = :userId`, { userId: user.id });

    if (search)
      return this.findAllWithSearch(sessionsQueryBuilder, searchArgs).getMany();

    return sessionsQueryBuilder.getMany();
  }

  async findAllByFarm(
    farm: Farm,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Session[]> {
    const { search } = searchArgs;

    const sessionsQueryBuilder = this.findAllConstruction(paginationArgs);
    sessionsQueryBuilder.where(`"farmId" = :farmId`, { farmId: farm.id });

    if (search)
      return this.findAllWithSearch(sessionsQueryBuilder, searchArgs).getMany();

    return sessionsQueryBuilder.getMany();
  }

  async findOne(id: string): Promise<Session> {
    const Session = await this.sessionsRepository.findOneBy({ id });

    if (!Session)
      throw new NotFoundException(`Session with id: ${id} not found`);

    return Session;
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

  findAllConstruction(
    paginationArgs: PaginationArgs,
  ): SelectQueryBuilder<Session> {
    const { limit, offset } = paginationArgs;

    return this.sessionsRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset);
  }

  findAllWithSearch(
    sessionBuilder: SelectQueryBuilder<Session>,
    searchArgs: SearchArgs,
  ): SelectQueryBuilder<Session> {
    const { search } = searchArgs;

    return sessionBuilder.andWhere('LOWER(name) like :name', {
      name: `%${search.toLowerCase()}%`,
    });
  }
}
