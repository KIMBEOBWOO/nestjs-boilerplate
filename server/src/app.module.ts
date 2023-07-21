import { Module } from '@nestjs/common';
import { ServerCacheModule } from './cache/cache.module';
import { ServerConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { AopModule } from '@toss/nestjs-aop';
import { TransactionModule } from 'typeorm-aop-transaction';
import { POSTGRES_CONNECTION } from './database/const/postgres-connection.const';

@Module({
  imports: [
    AopModule,
    TransactionModule.regist({
      defaultConnectionName: POSTGRES_CONNECTION,
      logging: 'all',
    }),
    ServerConfigModule,
    ServerCacheModule,
    QueueModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
