import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmail, isUUID } from 'class-validator';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

import { CreateUserInput } from './dto/inputs';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(signupInput: CreateUserInput): Promise<User> {
    try {
      signupInput.password = bcrypt.hashSync(signupInput.password, 10);

      const newUser = this.usersRepository.create({ ...signupInput });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  async findOne(term: string): Promise<User> {
    try {
      if (isUUID(term))
        return await this.usersRepository.findOneByOrFail({ id: term });

      if (isEmail(term))
        return await this.usersRepository.findOneByOrFail({ email: term });

      return await this.usersRepository.findOneByOrFail({ username: term });
    } catch (error) {
      throw new NotFoundException(`${term} not found`);
    }
  }

  /* async update(
    id: string,
    updateUserInput: UpdateUserInput,
    updateBy: User,
  ): Promise<User> {
    try {
      const user = await this.usersRepository.preload({
        ...updateUserInput,
        id,
      });

      user.lastUpdateBy = updateBy;

      return await this.usersRepository.save(user);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async block(id: string, adminUser: User): Promise<User> {
    const userToBlock = await this.findOneById(id);

    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = adminUser;

    return await this.usersRepository.save(userToBlock);
  } */

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
