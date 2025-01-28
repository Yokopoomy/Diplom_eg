import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET, PUT, POST, DELETE',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });
  app.enableCors();
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  await app.listen(port);
}
bootstrap();
