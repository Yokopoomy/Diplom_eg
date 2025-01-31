import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtClientManager extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtClientManager.name);
  private readonly allowedRoles = ['client', 'manager'];

  canActivate(context: ExecutionContext) {
    this.logger.log('Checking if user can activate (Client/Manager)');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error('User not authorized or error occurred', err?.message || info?.message);
      throw new UnauthorizedException('Пользователь не авторизован.');
    }

    if (!this.allowedRoles.includes(user.role)) {
      this.logger.warn(`User with role ${user.role} tried to access client/manager route`);
      throw new ForbiddenException('Пользователю запрещено выполнять этот запрос.');
    }

    return user;
  }
}