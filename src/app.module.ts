import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
// import { JwtService } from '@nestjs/jwt';

import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { PostsModule } from './posts/posts.module';
import { ImagesModule } from './images/images.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';
import { FarmsModule } from './farms/farms.module';
import { SeedModule } from './seed/seed.module';
import { FollowUpsModule } from './follow-ups/follow-ups.module';
import { ItemToFarmModule } from './item-to-farm/item-to-farm.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      useFactory: async () => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault],
        /* inject: [JwtService],
        useFactory: async (jwtService: JwtService) => ({
          playground: false,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          plugins: [ApolloServerPluginLandingPageLocalDefault], */
        /* context({ req }) {
          // const token = req.headers.authorization?.replace('Bearer ','');
          // if ( !token ) throw Error('Token needed');
          // const payload = jwtService.decode( token );
          // if ( !payload ) throw Error('Token not valid');
        }, */
      }),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl:
        process.env.STATE === 'prod'
          ? {
              rejectUnauthorized: false,
              sslmode: 'require',
            }
          : (false as any),
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),

    UsersModule,

    ItemsModule,

    PostsModule,

    ImagesModule,

    SessionsModule,

    AuthModule,

    FarmsModule,

    SeedModule,

    FollowUpsModule,

    ItemToFarmModule,
  ],
})
export class AppModule {}
