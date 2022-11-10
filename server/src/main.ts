import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.SERVER_PORT || 3000);

  Logger.log(
    `Nest.js is running on Port [${process.env.SERVER_PORT}], using ENV mode [${process.env.NODE_ENV}]`,
  );
}
bootstrap();
