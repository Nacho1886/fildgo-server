import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  SEED_USERS,
  SEED_ITEMS,
  SEED_FARMS,
  SEED_IMAGES,
  SEED_POSTS,
  SEED_SESSIONS,
} from './data/seed-data';

import { Item } from './../items/entities/item.entity';
import { User } from './../users/entities/user.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Image } from 'src/images/entities/image.entity';

import { ItemsService } from '../items/items.service';
import { UsersService } from './../users/users.service';
import { FarmsService } from 'src/farms/farms.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { PostsService } from 'src/posts/posts.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Farm)
    private readonly farmsRepository: Repository<Farm>,

    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,

    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly sessionsService: SessionsService,
    private readonly farmsService: FarmsService,
    private readonly postsService: PostsService,
    private readonly imagesService: ImagesService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed() {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on Prod');
    }

    await this.deleteDatabase();

    // Crear usuarios
    const user = await this.loadUsers();

    // Crear items
    const item = await this.loadItems(user);

    // Crear farms
    const farm = await this.loadFarms(user);

    return true;
  }

  async deleteDatabase() {
    // images
    await this.imagesRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // posts
    await this.postsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // sessions
    await this.sessionsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // farms
    await this.farmsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar items
    await this.itemsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // borrar users
    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async loadUsers(): Promise<User> {
    const users: User[] = [];

    for (const user of SEED_USERS) {
      users.push(await this.usersService.create(user));
    }

    return users[0];
  }

  async loadItems(user: User): Promise<Item> {
    const items: Item[] = [];

    for (const item of SEED_ITEMS) {
      items.push(await this.itemsService.create(item, user));
    }

    return items[0];
  }

  async loadFarms(user: User): Promise<Farm> {
    const farms: Farm[] = [];

    for (const Farm of SEED_FARMS) {
      farms.push(await this.farmsService.create(Farm, user));
    }

    return farms[0];
  }

  async loadSessions(user: User): Promise<Session> {
    const sessions: Session[] = [];

    for (const Session of SEED_SESSIONS) {
      sessions.push(await this.sessionsService.create(Session, user));
    }

    return sessions[0];
  }
}
