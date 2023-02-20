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
import { ItemToFarm } from 'src/item-to-farm/entities/item-to-farm.entity';
import { ItemToFarmService } from '../item-to-farm/item-to-farm.service';

import { CreateItemToFarmInput } from 'src/item-to-farm/dto/create-item-to-farm.input';
import { CreatePostInput } from 'src/posts/dto';

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
    @InjectRepository(ItemToFarm)
    private readonly itemToFarmsRepository: Repository<ItemToFarm>,

    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly sessionsService: SessionsService,
    private readonly farmsService: FarmsService,
    private readonly postsService: PostsService,
    private readonly imagesService: ImagesService,
    private readonly itemToFarmService: ItemToFarmService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed() {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on Prod');
    }

    await this.deleteDatabase();

    // Crear usuarios
    const users = await this.loadUsers();

    // Crear items
    const items = await this.loadItems(users[0]);

    // Crear farms
    const farms = await this.loadFarms(users[0]);

    const sessions = await this.loadSessions(users[0], items[0], farms[0]);

    const post = await this.loadPosts(users[0], sessions);

    await this.loadImages(users[0], post);

    await this.loadItemsToFarms(farms, items);

    return true;
  }

  async deleteDatabase() {
    await this.itemToFarmsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
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

  async loadUsers(): Promise<User[]> {
    const users: User[] = [];

    for (const user of SEED_USERS) {
      users.push(await this.usersService.create(user));
    }

    return users;
  }

  async loadItems(user: User): Promise<Item[]> {
    const items: Item[] = [];

    for (const item of SEED_ITEMS) {
      items.push(await this.itemsService.create(item, user));
    }

    return items;
  }

  async loadFarms(user: User): Promise<Farm[]> {
    const farms: Farm[] = [];

    for (const Farm of SEED_FARMS) {
      farms.push(await this.farmsService.create(Farm, user));
    }

    return farms;
  }

  async loadSessions(user: User, item: Item, farm: Farm): Promise<Session[]> {
    const sessions: Session[] = [];

    for (const session of SEED_SESSIONS) {
      const sessionInput = {
        farmId: farm.id,
        itemId: item.id,
        ...session,
      };
      sessions.push(await this.sessionsService.create(sessionInput, user));
    }

    return sessions;
  }

  async loadPosts(user: User, sessions: Session[]): Promise<Post> {
    const postInputs: CreatePostInput[] = SEED_POSTS.map((post, i) => ({
      sessionId: sessions[i].id,
      ...post,
    }));

    const createdPosts = await Promise.all(
      postInputs.map((postInput) => this.postsService.create(postInput, user)),
    );

    return createdPosts[0];
  }

  async loadImages(user: User, parent): Promise<void> {
    let parentId;

    if (parent instanceof Farm) parentId = { farmId: parent.id };
    if (parent instanceof Item) parentId = { itemId: parent.id };
    if (parent instanceof Session) parentId = { sessionId: parent.id };
    if (parent instanceof Post) parentId = { postId: parent.id };

    for (const image of SEED_IMAGES) {
      const imageInput = {
        ...parentId,
        ...image,
      };

      await this.imagesService.create(imageInput, user);
    }
  }

  async loadItemsToFarms(farms: Farm[], items: Item[]): Promise<void> {
    const shorterArray: number =
      farms.length < items.length ? farms.length : items.length;

    const relationInputs: CreateItemToFarmInput[] = [];

    farms.forEach((farm, i, farmsArray) => {
      /* delete farmsArray[i];
      console.log(
        '🚀 ~ file: seed.service.ts:245 ~ SeedService ~ farms.forEach ~ farmsArray',
        farmsArray,
      );
      console.log(
        '🚀 ~ file: seed.service.ts:245 ~ SeedService ~ farms.forEach ~ farms',
        farms,
      ); */
      const quantityRelations = i + 1;
      for (
        let index = 0;
        index < shorterArray && index < quantityRelations;
        index++
      ) {
        const relationItF: CreateItemToFarmInput = {
          farmId: farm.id,
          itemId: items[index].id,
        };
        relationInputs.push(relationItF);
      }
    });
    await Promise.all(
      relationInputs.map((itemToFarm) => {
        return this.itemToFarmService.create(itemToFarm);
      }),
    );
  }
  /* async loadFollowUps(
    users: User[],
    farms: Farm[],
    items: Item[],
  ): Promise<void> {
    const relationInputs: CreateItemToFarmInput[] = [];

    users.forEach((user, i) => {
      const quantityRelations = i + 1;
      for (
        let index = 0;
        index < shorterArray && index < quantityRelations;
        index++
      ) {
        const relationItF: CreateItemToFarmInput = {
          farmId: farm.id,
          itemId: items[index].id,
        };
        relationInputs.push(relationItF);
      }
    });
    await Promise.all(
      relationInputs.map((itemToFarm) => {
        return this.itemToFarmService.create(itemToFarm);
      }),
    );
  } */
}
