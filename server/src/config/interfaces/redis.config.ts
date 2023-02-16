/**
 * @name REDIS_CONFIG
 * - this is interface, redis (in memory cache) config environment variable
 */
export interface IsRedisConfig {
  readonly redisHost: string; // redis config host
  readonly redisPort: number; // redis config port (default 6379)
  readonly redisPassword: string; // redis config password (with docker)
}
