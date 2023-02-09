import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SEED_USERS, SEED_ITEMS, SEED_LISTS } from './data/seed-data';

import { Item } from './../items/entities/item.entity';
import { User } from './../users/entities/user.entity';

import { ItemsService } from '../items/items.service';
import { UsersService } from './../users/users.service';
import { Farm } from 'src/farms/entities/farm.entity';
import { FarmsService } from 'src/farms/farms.service';
import { Session } from 'src/sessions/entities/session.entity';
import { SessionsService } from 'src/sessions/sessions.service';
import { Post } from 'src/posts/entities/post.entity';
import { Image } from 'src/images/entities/image.entity';
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
    await this.loadItems(user);

    // Crear listas
    const list = await this.loadLists(user);

    // Crear listItems
    const items = await this.itemsService.findAll(
      user,
      { limit: 15, offset: 0 },
      {},
    );
    await this.loadListItems(list, items);

    return true;
  }

  async deleteDatabase() {
    // ListItems
    await this.listItemsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // Lists
    await this.listsRepository
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
    const users = [];

    for (const user of SEED_USERS) {
      users.push(await this.usersService.create(user));
    }

    return users[0];
  }

  async loadItems(user: User): Promise<void> {
    const itemsPromises = [];

    for (const item of SEED_ITEMS) {
      itemsPromises.push(this.itemsService.create(item, user));
    }

    await Promise.all(itemsPromises);
  }

  async loadLists(user: User): Promise<List> {
    const lists = [];

    for (const list of SEED_LISTS) {
      lists.push(await this.listsService.create(list, user));
    }

    return lists[0];
  }

  async loadListItems(list: List, items: Item[]) {
    for (const item of items) {
      this.listItemService.create({
        quantity: Math.round(Math.random() * 10),
        completed: Math.round(Math.random() * 1) === 0 ? false : true,
        listId: list.id,
        itemId: item.id,
      });
    }
  }
}
