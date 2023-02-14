import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../users/entities/user.entity';
import { Post } from './entities/Post.entity';

import { CreatePostInput, UpdatePostInput } from './dto';
import { PaginationArgs, SearchArgs } from './../common/dto/args';
import {
  createRepositoryByParentId,
  findAllWithSearch,
  paginationConstruct,
} from 'src/common/functions';
import { searchByParentId } from '../common/functions/search-by-parent-id.function';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostInput: CreatePostInput, user: User): Promise<Post> {
    const newPost = createRepositoryByParentId(
      this.postsRepository,
      createPostInput,
      user,
    );
    return await this.postsRepository.save(newPost);
  }

  async findAll(
    parent,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Post[]> {
    const { search } = searchArgs;

    const postBuilder = this.postsRepository.createQueryBuilder();

    const postsPaginate = paginationConstruct(postBuilder, paginationArgs);

    const postWithParent = searchByParentId(postsPaginate, parent);

    if (search)
      return await findAllWithSearch(postWithParent, searchArgs).getMany();

    return await postWithParent.getMany();
  }

  async findOne(id: string, parent): Promise<Post> {
    const postBuilder = this.postsRepository.createQueryBuilder();
    const post = searchByParentId(postBuilder, parent);

    if (!post) throw new NotFoundException(`Post with id: ${id} not found`);

    return await post.getOne();
  }

  /* async update(
    id: string,
    updatePostInput: UpdatePostInput,
    user: User,
  ): Promise<Post> {
    await this.findOne(id, user);
    //? const Post = await this.postsRepository.preload({ ...updatePostInput, user });
    const Post = await this.postsRepository.preload(updatePostInput);

    if (!Post) throw new NotFoundException(`Post with id: ${id} not found`);

    return this.postsRepository.save(Post);
  }

  async remove(id: string, user: User): Promise<Post> {
    // TODO: soft delete, integridad referencial
    const Post = await this.findOne(id, user);
    await this.postsRepository.remove(Post);
    return { ...Post, id };
  }

  async PostCountByUser(user: User): Promise<number> {
    return this.postsRepository.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  } */
}
