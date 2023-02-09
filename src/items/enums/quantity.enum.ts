import { registerEnumType } from '@nestjs/graphql';

export enum ValidQuantities {
  unit = 'unit',
  pound = 'pound',
  bag = 'bag',
  box = 'box',
  Kg = 'Kg',
  L = 'L',
  lb = 'lb',
}

registerEnumType(ValidQuantities, {
  name: 'ValidUnities',
  description: 'Different types of unities for farm items.',
});
