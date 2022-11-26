import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsRedisConfig } from '../config/interfaces/redis.config';

@Global()
@Module({
  imports: [
    // setup Root Bull Module
    BullModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<IsRedisConfig, true>,
      ) => ({
        redis: {
          /**
           * @link https://docs.nestjs.com/techniques/queues#producers
           * if you needs more customized options, click link
           *
           * limiter: RateLimiter - Options to control the rate at which the queue's jobs are processed. See RateLimiter for more information. Optional.
           * redis: RedisOpts - Options to configure the Redis connection. See RedisOpts for more information. Optional.
           * prefix: string - Prefix for all queue keys. Optional.
           * defaultJobOptions: JobOpts - Options to control the default settings for new jobs. See JobOpts for more information. Optional.
           * settings: AdvancedSettings - Advanced Queue configuration settings. These should usually not be changed. See AdvancedSettings for more information. Optional.
           */
          host: configService.get('redisHost'),
          port: configService.get('redisPort'),
          password: configService.get('redisPassword'),
        },
      }),
      inject: [ConfigService<IsRedisConfig, true>],
    }),

    // setup Queue
    BullModule.registerQueue({
      name: 'Test',
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
