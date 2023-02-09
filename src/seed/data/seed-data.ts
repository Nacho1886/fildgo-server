import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { CreateUserInput } from '../../users/dto/create-user.input';
import { CreateItemInput } from 'src/items/dto/create-item.input';
import { ValidQuantities, ValidTagItems } from 'src/items/enums';
import { CreateFarmInput } from 'src/farms/dto/create-farm.input';
import { ValidTagFarms } from 'src/farms/enums/tag-farm.enum';
import { CreateSessionInput } from 'src/sessions/dto/create-session.input';
import { ValidTypeSsesion } from 'src/sessions/enums/type-session.enum';
import { CreatePostInput } from 'src/posts/dto/create-post.input';
import { CreateImageInput } from 'src/images/dto/create-image.input';

export const SEED_USERS: CreateUserInput[] = [
  {
    name: 'Nacho',
    lastname: 'Martí',
    email: 'nacho@google.com',
    username: 'Nacho1886',
    password: 'Hola1234',
    roles: [ValidRoles.admin, ValidRoles.owner, ValidRoles.user],
  },
  {
    name: 'Melissa',
    lastname: 'pepe',
    email: 'melissa@google.com',
    username: 'pepe',
    password: 'Hola1234',
    roles: [ValidRoles.user],
  },
  {
    name: 'Hernando',
    lastname: 'pepe',
    email: 'hernando@google.com',
    username: 'pepote',
    password: 'Hola1234',
    roles: [ValidRoles.user],
  },
];

export const SEED_ITEMS: CreateItemInput[] = [
  {
    name: 'Chicken breast (skinless,boneless)',
    quantityUnits: ValidQuantities.lb,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Chicken thighs (skinless,boneless)',
    quantityUnits: ValidQuantities.box,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Fish filets',
    quantityUnits: ValidQuantities.unit,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Ground turkey or chicken',
    quantityUnits: ValidQuantities.lb,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Lean ground beef',
    quantityUnits: ValidQuantities.pound,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Veggie burgers',
    quantityUnits: ValidQuantities.box,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Chicken breast (skinless,boneless)',
    quantityUnits: ValidQuantities.unit,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Chicken thighs (skinless,boneless)',
    quantityUnits: ValidQuantities.box,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Chicken salad (made with lower calorie mayo)',
    quantityUnits: null,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Tuna salad (made with lower calorie mayo)',
    quantityUnits: null,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Egg salad (made with lower calorie mayo)',
    quantityUnits: ValidQuantities.unit,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Lean ground beef',
    quantityUnits: ValidQuantities.pound,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Ground turkey or chicken',
    quantityUnits: ValidQuantities.pound,
    tag: ValidTagItems.meat,
  },
  {
    name: 'Mixed vegetables',
    quantityUnits: ValidQuantities.bag,
    tag: ValidTagItems.plant_stem,
  },
  {
    name: 'Brussels sprouts',
    quantityUnits: null,
    tag: ValidTagItems.leafy_green,
  },
];

export const SEED_FARMS: CreateFarmInput[] = [
  {
    title: 'Green Pastures',
    tags: [ValidTagFarms.urban, ValidTagFarms.organic],
  },
  {
    title: 'Granja Pepe',
    tags: [ValidTagFarms.intensive],
  },
  {
    title: 'Cebollino`s',
    tags: [ValidTagFarms.nomadic],
  },
];

export const SEED_SESSIONS: CreateSessionInput[] = [
  {
    typeSession: ValidTypeSsesion.hours,
    reservedQuantity: 3,
  },
  {
    typeSession: ValidTypeSsesion.quantity,
    reservedQuantity: 10,
  },
  {
    typeSession: ValidTypeSsesion.hours,
    reservedQuantity: 2,
  },
];

export const SEED_POSTS: CreatePostInput[] = [
  {
    title: 'Bueno',
    description: 'Me encanto la experiencia',
    stars: 4,
  },
  {
    title: 'Lo mejor',
    description: 'Fascinante.',
    stars: 4.5,
  },
  {
    title: 'Lo mejor',
    description: 'Me encanto la experiencia',
    stars: 5,
  },
];

export const SEED_IMAGES: CreateImageInput[] = [
  {
    url: 'ejemplo1.com',
  },
  {
    url: 'ejemplo2.com',
  },
  {
    url: 'ejemplo3.com',
  },
];
