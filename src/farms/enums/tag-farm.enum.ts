import { registerEnumType } from '@nestjs/graphql';

export enum ValidTagFarms {
  aquaculture = 'aquaculture',
  cooperative = 'cooperative',
  hay = 'hay',
  organic = 'organic',
  urban = 'urban',
  nomadic = 'nomadic',
  sedentary = 'sedentary',
  intensive = 'intensive',
}

registerEnumType(ValidTagFarms, {
  name: 'ValidTagFarms',
  description: 'Different types of tags for a farms.',
});
