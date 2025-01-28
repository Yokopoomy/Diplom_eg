import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello() {
    return { say: 'Hello World!' };
  }
}
