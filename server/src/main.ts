import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Queue } from 'bull';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*******************************************************
   * @name SET_UP_BULL_BOARD
   *******************************************************/
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bull-board'); // set up base path (bull board)

  const aQueue1 = app.get<Queue>(`BullQueue_Test`); // get queue from app

  createBullBoard({
    queues: [new BullAdapter(aQueue1)],
    serverAdapter,
  });

  app.use('/bull-board', serverAdapter.getRouter());

  /*******************************************************
   * @name SET_UP_BULL_BOARD
   *******************************************************/

  const config = new DocumentBuilder()
    .setTitle('Nest.js Boilerplate')
    .setDescription('@KIMBEOBWOO Nestjs REST API boilerplate')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useWebSocketAdapter(new WsAdapter());

  /*******************************************************/

  await app.listen(process.env.SERVER_PORT || 3000);

  Logger.log(
    `Nest.js is running on Port [${process.env.SERVER_PORT}], using ENV mode [${process.env.NODE_ENV}]`,
  );
}
bootstrap();
