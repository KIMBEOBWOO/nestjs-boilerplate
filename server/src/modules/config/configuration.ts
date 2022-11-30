import * as Joi from 'joi';
import { IsCacheConfig } from './interfaces/cache.config.interface';
import { IsPostgresDatabaseConfig } from './interfaces/postgres-database.config.interface';
import { IsRedisConfig } from './interfaces/redis.config';

/**
 * Perform validation of environment variable objects with a given interface.
 */
export default () => {
  // joi validation target schema
  const schema = Joi.object<
    /**
     * If additional environment variables are required,
     * configure the appropriate interface and add it to the union type.
     */
    IsPostgresDatabaseConfig & IsCacheConfig & IsRedisConfig,
    true
  >({
    postgresHost: Joi.string().required(),
    postgresPort: Joi.number().required(),
    postgresUserName: Joi.string().required(),
    postgresPassword: Joi.string().required(),
    postgresDatabaseName: Joi.string().required(),

    cacheHost: Joi.string().required(),
    cachePort: Joi.number().required(),

    // reids config
    redisHost: Joi.string().required(),
    redisPort: Joi.number().required(),
    redisPassword: Joi.string().required(),
  });

  // validate target values
  const config = {
    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: process.env.POSTGRES_PORT,
    postgresUserName: process.env.POSTGRES_USERNAME,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresDatabaseName: process.env.POSTGRES_DATABASE,

    cacheHost: process.env.CACHE_HOST,
    cachePort: process.env.CACHE_PORT,

    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,
  };

  const { error, value } = schema.validate(config);

  if (error) {
    throw new Error('Env Missing ' + error.message);
  }

  return value;
};
