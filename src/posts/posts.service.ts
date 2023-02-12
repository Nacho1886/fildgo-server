import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { CreatePostInput, UpdatePostInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { User } from './../users/entities/user.entity';
import { Post } from './entities/Post.entity';
import { findAllWithSearch, paginationConstruct } from 'src/common/functions';
import { searchByParentId } from '../common/functions/search-by-parent-id.function';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly PostsRepository: Repository<Post>,
  ) {}

  async create(createPostInput: CreatePostInput, user: User): Promise<Post> {
    const newPost = this.PostsRepository.create({
      ...createPostInput,
      user,
    });
    return await this.PostsRepository.save(newPost);
  }

  async findAll(
    parent,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Post[]> {
    const { search } = searchArgs;

    const PostBuilder = this.PostsRepository.createQueryBuilder();

    const PostsPaginate = paginationConstruct(PostBuilder, paginationArgs);

    const PostWithParent = searchByParentId(PostsPaginate, parent);

    if (search) return findAllWithSearch(PostWithParent, searchArgs).getMany();

    return await PostWithParent.getMany();
  }

  async findOne(id: string, parent): Promise<Post> {
    const PostBuilder = this.PostsRepository.createQueryBuilder();
    const Post = searchByParentId(PostBuilder, parent);

    if (!Post) throw new NotFoundException(`Post with id: ${id} not found`);

    return Post.getOne();
  }

  /* async update(
    id: string,
    updatePostInput: UpdatePostInput,
    user: User,
  ): Promise<Post> {
    await this.findOne(id, user);
    //? const Post = await this.PostsRepository.preload({ ...updatePostInput, user });
    const Post = await this.PostsRepository.preload(updatePostInput);

    if (!Post) throw new NotFoundException(`Post with id: ${id} not found`);

    return this.PostsRepository.save(Post);
  }

  async remove(id: string, user: User): Promise<Post> {
    // TODO: soft delete, integridad referencial
    const Post = await this.findOne(id, user);
    await this.PostsRepository.remove(Post);
    return { ...Post, id };
  }

  async PostCountByUser(user: User): Promise<number> {
    return this.PostsRepository.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  } */
}
