import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsPostgresDatabaseConfig } from '../config/interfaces/postgres-database.config.interface';
import { POSTGRES_CONNECTION } from './const/postgres-connection.const';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: POSTGRES_CONNECTION,
      inject: [ConfigService<IsPostgresDatabaseConfig>],
      useFactory: (config: ConfigService<IsPostgresDatabaseConfig, true>) => ({
        type: 'postgres',
        host: config.get('postgresHost'),
        port: config.get('postgresPort'),
        username: config.get('postgresUserName'),
        password: config.get('postgresPassword'),
        database: config.get('postgresDatabaseName'),
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
