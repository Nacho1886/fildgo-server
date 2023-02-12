import { Farm } from 'src/farms/entities/farm.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities';
import { SelectQueryBuilder } from 'typeorm';

export const searchByParentId = (
  childQueryBuilder: SelectQueryBuilder<any>,
  parent,
): SelectQueryBuilder<any> => {
  if (parent instanceof User)
    return childQueryBuilder.where(`"userId" = :userId`, { userId: parent.id });
  if (parent instanceof Farm)
    return childQueryBuilder.where(`"farmId" = :farmId`, { farmId: parent.id });
  if (parent instanceof Item)
    return childQueryBuilder.where(`"itemId" = :itemId`, { itemId: parent.id });
};
