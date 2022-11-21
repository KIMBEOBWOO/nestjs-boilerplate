import * as Joi from 'joi';
import { IsPostgresDatabaseConfig } from './interfaces/postgres-database.config.interface';

export default (): IsPostgresDatabaseConfig => {
  // joi validation target schema
  const schema = Joi.object<IsPostgresDatabaseConfig, true>({
    postgresHost: Joi.string().required(),
    postgresPort: Joi.number().required(),
    postgresUserName: Joi.string().required(),
    postgresPassword: Joi.string().required(),
    postgresDatabaseName: Joi.string().required(),
  });

  // validate target values
  const config = {
    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: process.env.POSTGRES_PORT,
    postgresUserName: process.env.POSTGRES_USERNAME,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresDatabaseName: process.env.POSTGRES_DATABASE,
  };

  const { error, value } = schema.validate(config);

  if (error) {
    throw new Error('Env Missing ' + error.details.toString());
  }

  return value;
};
