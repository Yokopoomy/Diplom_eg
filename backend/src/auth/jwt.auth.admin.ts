import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdmin extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAdmin.name);

  canActivate(context: ExecutionContext) {
    this.logger.log('Checking if user can activate (Admin)');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error('User not authorized or error occurred', err?.message || info?.message);
      throw new UnauthorizedException('Пользователь не авторизован.');
    }

    if (user.role !== 'admin') {
      this.logger.warn(`User with role ${user.role} tried to access admin route`);
      throw new ForbiddenException('Пользователю запрещено выполнять этот запрос.');
    }

    return user;
  }
}