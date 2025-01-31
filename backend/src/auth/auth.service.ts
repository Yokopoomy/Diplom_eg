import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ICreateUserDto } from 'src/users/interfaces/dto/create-user';
import * as bcrypt from 'bcrypt';
import { IUserFromFrontDto } from 'src/users/interfaces/dto/userFromFront';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // ===========================================================
  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);

    try {
      const user = await this.usersService.findOne(email);
      if (!user) {
        throw new UnauthorizedException('Пользователь с таким E-mail не зарегистрирован.');
      }

      const isMatch = await bcrypt.compare(pass, user.passwordHash);
      if (!isMatch) {
        throw new UnauthorizedException('Неверный пароль.');
      }

      return {
        _id: user._id,
        contactPhone: user.contactPhone,
        mail: user.email,
        name: user.name,
        role: user.role,
      };
    } catch (err) {
      this.logger.error(`Error validating user: ${err.message}`);
      throw new UnauthorizedException('Ошибка при проверке пользователя.');
    }
  }

  // ===========================================================
  async login(user: any) {
    this.logger.log(`Logging in user with ID: ${user._id}`);

    const payload = { email: user.mail, id: String(user._id), role: user.role };
    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`Generated token for user: ${user.mail}`);

    return {
      access_token: accessToken,
      user,
    };
  }

  // ===========================================================
  async register(userNew: IUserFromFrontDto) {
    this.logger.log(`Registering new user with email: ${userNew.email}`);

    const user = await this.usersService.createUser(userNew);
    const payload = { email: user.email, id: String(user._id) };
    const { passwordHash, ...result } = user.toObject(); // Используем toObject() для Mongoose документа

    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }

  // ===========================================================
  createToken(payload: any) {
    this.logger.log(`Creating token with payload: ${JSON.stringify(payload)}`);
    return this.jwtService.sign(payload);
  }

  // ===========================================================
  testtoken() {
    this.logger.log('Testing token access');
    return { statusCode: 200, message: 'Успешный доступ к закрытой странице' };
  }
}