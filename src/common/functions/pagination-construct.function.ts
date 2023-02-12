import { SelectQueryBuilder } from 'typeorm';

import { PaginationArgs } from '../dto/args';

export const paginationConstruct = (
  repositoryBuilder: SelectQueryBuilder<any>,
  paginationArgs: PaginationArgs,
): SelectQueryBuilder<any> => {
  const { limit, offset } = paginationArgs;

  return repositoryBuilder.take(limit).skip(offset);
};
