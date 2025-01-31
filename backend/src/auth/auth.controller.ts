import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.auth.guard';
import { IParamId } from 'src/users/interfaces/param-id';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ICreateUserDto } from 'src/users/interfaces/dto/create-user';
import { IUserFromFrontDto } from 'src/users/interfaces/dto/userFromFront';
import { IUpdateUserDto } from 'src/users/interfaces/dto/update-user';
import { JwtAdmin } from './jwt.auth.admin';
import { JwtManager } from './jwt.auth.manager';
import { JwtAdminManager } from './jwtAdminManager';

@Controller('api')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  // Get all users (Admin, Manager)
  @UseGuards(JwtAdminManager)
  @Get('/admin/users')
  findAll(@Query() params: any) {
    this.logger.log('Fetching all users with params: ' + JSON.stringify(params));
    return this.userService.findAll(params);
  }

  // Register a new user
  @Post('/auth/signup')
  async register(@Body() body: IUserFromFrontDto) {
    this.logger.log('Registering new user: ' + JSON.stringify(body));
    return this.authService.register(body);
  }

  // Login user
  @Post('/auth/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: any) {
    this.logger.log('User logged in: ' + JSON.stringify(req.user));
    return this.authService.login(req.user);
  }

  // Update user (Admin)
  @UseGuards(JwtAdmin)
  @Put('/admin/users/:id')
  public update(@Param('id') id: string, @Body() data: IUpdateUserDto): any {
    this.logger.log(`Updating user with ID: ${id}, data: ${JSON.stringify(data)}`);
    return this.userService.update(id, data);
  }

  // Delete user (Admin)
  @UseGuards(JwtAdmin)
  @Delete('/admin/users/:id')
  public delete(@Param() { id }: IParamId): Promise<UserDocument> {
    this.logger.log(`Deleting user with ID: ${id}`);
    return this.userService.delete(id);
  }

  // Test token (Admin, Manager)
  @UseGuards(JwtAdminManager)
  @Get('testtoken')
  testtoken() {
    this.logger.log('Testing token');
    return this.authService.testtoken();
  }
}