import { Module } from '@nestjs/common';
import { ServerConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [ServerConfigModule, DatabaseModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
