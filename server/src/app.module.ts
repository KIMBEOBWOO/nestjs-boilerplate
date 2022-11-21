import { Module } from '@nestjs/common';
import { ServerConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ServerConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
