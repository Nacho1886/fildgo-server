import { Injectable } from '@nestjs/common';
import { CreateFollowUpInput } from './dto/create-follow-up.input';
import { UpdateFollowUpInput } from './dto/update-follow-up.input';

@Injectable()
export class FollowUpsService {
  create(createFollowUpInput: CreateFollowUpInput) {
    return 'This action adds a new followUp';
  }

  findAll() {
    return `This action returns all followUps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} followUp`;
  }

  update(id: number, updateFollowUpInput: UpdateFollowUpInput) {
    return `This action updates a #${id} followUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} followUp`;
  }
}
