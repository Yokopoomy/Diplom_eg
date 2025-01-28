import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  // Для теста
  // @Get('/token')
  // getToken(): string {
  //   console.log('app.cont 222');
  //   return this.authService.createToken({ email: 'Maria', role: 'admin' });
  // }
}
