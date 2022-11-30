import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import configuration from './configuration';

/**
 * Server Configuration Module
 * - Module that provides environment variables for the server.
 * - The module is set as a global module to allow injection globally.
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `envs/.env.${process.env.NODE_ENV}`, // set env file path
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .required(),
        SERVER_PORT: Joi.number().required(),
      }),
      load: [configuration],
    }),
  ],
})
export class ServerConfigModule {}
