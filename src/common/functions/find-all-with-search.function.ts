import { SelectQueryBuilder } from 'typeorm';

import { SearchArgs } from '../dto/args';

export const findAllWithSearch = (
  repositoryBuilder: SelectQueryBuilder<any>,
  searchArgs: SearchArgs,
): SelectQueryBuilder<any> => {
  const { search } = searchArgs;

  return repositoryBuilder.andWhere('LOWER(name) like :name', {
    name: `%${search.toLowerCase()}%`,
  });
};
