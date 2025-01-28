import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


console.log('==============================================');
console.log('process.env.MONGO_CONNECTION', process.env.MONGO_CONNECTION);
console.log('==============================================');

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION)
  ],
  controllers: [AppController]
})
export class AppModule {}
