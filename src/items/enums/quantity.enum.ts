import { registerEnumType } from '@nestjs/graphql';

export enum ValidQuantities {
  unit = 'unit',
  Kg = 'Kg',
  L = 'L',
}

registerEnumType(ValidQuantities, {
  name: 'ValidUnities',
  description: 'Different types of unities for farm items.',
});
