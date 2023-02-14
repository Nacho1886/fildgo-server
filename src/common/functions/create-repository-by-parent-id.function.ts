import { Repository } from 'typeorm';
import { ParentIdTypes } from '../enums/parent-id-types.enum';
import { User } from 'src/users/entities/user.entity';

export const createRepositoryByParentId = (
  repository: Repository<any>,
  inputDto: object,
  user?: User,
) => {
  const objectIds = {};

  for (const [key, value] of Object.entries(ParentIdTypes)) {
    if (inputDto.hasOwnProperty(value)) {
      objectIds[key] = { id: inputDto[value] };
      delete inputDto[value];
    }
  }
  return user
    ? repository.create({ ...inputDto, ...objectIds, user })
    : repository.create({ ...inputDto, ...objectIds });
};
