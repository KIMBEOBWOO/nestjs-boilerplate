import { Module } from '@nestjs/common';
import { ServerConfigModule } from './modules/config/config.module';

@Module({
  imports: [ServerConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
