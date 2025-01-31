import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtManager extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtManager.name);

  canActivate(context: ExecutionContext) {
    this.logger.log('Checking if user can activate (Manager)');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error('User not authorized or error occurred', err?.message || info?.message);
      throw new UnauthorizedException('Пользователь не авторизован.');
    }

    if (user.role !== 'manager') {
      this.logger.warn(`User with role ${user.role} tried to access manager route`);
      throw new ForbiddenException('Пользователю запрещено выполнять этот запрос.');
    }

    return user;
  }
}