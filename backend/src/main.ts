import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('Bootstrap');

  app.enableCors();
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  await app.listen(port);
  logger.log(`Application is running on port: ${port}`);
}
bootstrap();