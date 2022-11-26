import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { IsRedisConfig } from '../config/interfaces/redis.config';
import { REDIS_CACHE_MANAGER } from './symbols/redis.symbol';

/**
 * Cache Module
 * The module is a global module with global reference.
 * Various stores such as redis and mongo can be registered as providers and expanded.
 */
@Global()
@Module({
  providers: [
    {
      /**
       * how to use
       * - @Inject(REDIS_CACHE_MANAGER) cacheManager: Cache
       */
      provide: REDIS_CACHE_MANAGER,
      useFactory: async (configService: ConfigService<IsRedisConfig>) =>
        await redisStore({
          socket: {
            host: configService.get('redisHost'),
            port: configService.get('redisPort'),
          },
          password: configService.get('redisPassword'),
          ttl: 10,
        }),
      inject: [ConfigService<IsRedisConfig>],
    },
  ],
  exports: [REDIS_CACHE_MANAGER],
})
export class ServerCacheModule {}
