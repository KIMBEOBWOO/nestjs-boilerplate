import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsPostgresDatabaseConfig } from '../config/interfaces/postgres-database.config.interface';
import { Post } from '../post/entities/post.entity';
import { POSTGRES_CONNECTION } from './const/postgres-connection.const';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: POSTGRES_CONNECTION,
      inject: [ConfigService<IsPostgresDatabaseConfig>],
      useFactory: (
        configService: ConfigService<IsPostgresDatabaseConfig, true>,
      ) => ({
        type: 'postgres',
        host: configService.get('postgresHost'),
        port: configService.get('postgresPort'),
        username: configService.get('postgresUserName'),
        password: configService.get('postgresPassword'),
        database: configService.get('postgresDatabaseName'),
        synchronize: false,
        keepConnectionAlive: true,
        entities: [Post],
      }),
    }),
  ],
})
export class DatabaseModule {}
