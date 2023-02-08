import { registerEnumType } from '@nestjs/graphql';

export enum ValidTypeSsesion {
  hours = 'hours',
  quantity = 'quantity',
}

registerEnumType(ValidTypeSsesion, {
  name: 'ValidTypeSsesion',
  description: 'Different types of session format.',
});
