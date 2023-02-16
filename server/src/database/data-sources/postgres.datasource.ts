import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10) || 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  dropSchema: false,
  bigNumberStrings: false,
  keepConnectionAlive: true,
  synchronize: false,
  // Entity file path (always consider dockerfile)
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  // Migration file path (always consider dockerfile)
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  // Migration Table name (default migartions)
  migrationsTableName: 'migrations',
} as DataSourceOptions);
