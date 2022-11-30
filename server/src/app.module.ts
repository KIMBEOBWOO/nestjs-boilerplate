import { Module } from '@nestjs/common';
import { ServerCacheModule } from './modules/cache/cache.module';
import { ServerConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [ServerConfigModule, ServerCacheModule, QueueModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
