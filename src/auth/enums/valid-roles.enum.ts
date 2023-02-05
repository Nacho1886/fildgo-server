import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  guest = 'guest',
  user = 'user',
  owner = 'owner',
  admin = 'admin',
}

registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'Different types of user roles inside the app.',
});
