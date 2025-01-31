import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async getHello() {
    this.logger.log('Returning hello message');
    return { say: 'Hello World!' };
  }
}