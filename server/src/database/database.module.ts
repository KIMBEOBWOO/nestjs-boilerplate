import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsPostgresDatabaseConfig } from '../config/interfaces/postgres-database.config.interface';
import { POSTGRES_CONNECTION } from './const/postgres-connection.const';

/**
 * Database Module
 * - The module is a global module that provides the TypeORM database.
 * - If additional database connections are required, "forRootAsync" can be added to the "import" array.
 */
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
        // Entity file path (always consider dockerfile)
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
    }),
  ],
})
export class DatabaseModule {}
