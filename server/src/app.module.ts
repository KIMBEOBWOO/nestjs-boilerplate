import { Module } from '@nestjs/common';
import { ServerCacheModule } from './cache/cache.module';
import { ServerConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ServerConfigModule,
    ServerCacheModule,
    QueueModule,
    DatabaseModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
