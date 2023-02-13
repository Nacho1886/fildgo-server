import { Repository } from 'typeorm';
import { ParentIdTypes } from '../enums/parent-id-types.enum';
import { User } from 'src/users/entities';

export const createRepositoryByParentId = (
  repository: Repository<any>,
  parent: object,
  user: User,
) => {
  const objectIds = {};

  for (const [key, value] of Object.entries(ParentIdTypes)) {
    if (parent.hasOwnProperty(value)) {
      objectIds[key] = { id: parent[value] };
      delete parent[value];
    }
  }
  return repository.create({ ...parent, ...objectIds, user });
};
