import { registerEnumType } from '@nestjs/graphql';

export enum ValidTagItems {
  citrus = 'citrus',
  legume = 'legume',
  apple = 'apple',
  pear = 'pear',
  stone_fruit = 'stone fruit',
  banana = 'banana',
  mango = 'mango',
  berry = 'berry',
  tomato = 'tomato',
  avocado = 'avocado',
  leafy_green = 'leafy green',
  cruciferous = 'cruciferous',
  marrow = 'marrow',
  allium = 'allium',
  plant_stem = 'plant stem',
  meat = 'meat',
}

registerEnumType(ValidTagItems, {
  name: 'ValidTagItems',
  description: 'Different types of tags for farm items.',
});
