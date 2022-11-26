import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { IsRedisConfig } from '../config/interfaces/redis.config';
import { REDIS_TOKEN } from './symbols/redis.symbol';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_TOKEN,
      useFactory: async (configService: ConfigService<IsRedisConfig>) =>
        await redisStore({
          socket: {
            host: configService.get('redisHost'),
            port: configService.get('redisPort'),
          },
          password: 'wjdrms15!',
          ttl: 10,
        }),
      inject: [ConfigService<IsRedisConfig>],
    },
  ],
  exports: [REDIS_TOKEN],
})
export class ServerCacheModule {}
