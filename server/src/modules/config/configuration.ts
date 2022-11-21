import * as Joi from 'joi';
import { IsCacheConfig } from './interfaces/cache.config.interface';
import { IsPostgresDatabaseConfig } from './interfaces/postgres-database.config.interface';

export default () => {
  // joi validation target schema
  const schema = Joi.object<IsPostgresDatabaseConfig & IsCacheConfig, true>({
    postgresHost: Joi.string().required(),
    postgresPort: Joi.number().required(),
    postgresUserName: Joi.string().required(),
    postgresPassword: Joi.string().required(),
    postgresDatabaseName: Joi.string().required(),

    cacheHost: Joi.string().required(),
    cachePort: Joi.number().required(),
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
  };

  const { error, value } = schema.validate(config);

  if (error) {
    throw new Error('Env Missing ' + error.message);
  }

  return value;
};
