import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Queue } from 'bull';
import { AppModule } from './app.module';
import { BullAdapter } from '@bull-board/api/bullAdapter';

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
  /*******************************************************/

  await app.listen(process.env.SERVER_PORT || 3000);

  Logger.log(
    `Nest.js is running on Port [${process.env.SERVER_PORT}], using ENV mode [${process.env.NODE_ENV}]`,
  );
}
bootstrap();
