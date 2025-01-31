import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsModule } from './hotels/hotels.module';
import { ChatModule } from './chat/chat.module';
import { WebsocetsGateway } from './websocets/websocets.gateway';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    HotelsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebsocetsGateway],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('Initializing AppModule');
    this.logger.log(`MongoDB Connection: ${process.env.MONGO_CONNECTION}`);
  }
}