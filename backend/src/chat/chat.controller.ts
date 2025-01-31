import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ParamIdDto } from './interfaces/ParamIdDto';
import { SendMessageDto } from './interfaces/SendMessageDto';
import { ReadMessageDto } from './interfaces/ReadMessageDTO';
import { SupportRequestDocument } from './schemas/SupportRequest.schema';
import { JwtManager } from 'src/auth/jwt.auth.manager';
import { JwtClient } from 'src/auth/jwt.client';
import { JwtClientManager } from 'src/auth/jwtClientManager';

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtClientManager)
  @Post('common/support-requests/:id/messages')
  public async addMessage(
    @Param() { id }: ParamIdDto,
    @Body() body: SendMessageDto,
  ): Promise<SupportRequestDocument> {
    try {
      return await this.chatService.addMessage(body, id);
    } catch (error) {
      throw new HttpException('Failed to add message', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtClientManager)
  @Post('common/support-requests/:id/messages/read')
  public async readMessage(
    @Param() { id }: ParamIdDto,
    @Body() body: ReadMessageDto,
  ): Promise<void> {
    try {
      await this.chatService.readMessage(body, id);
    } catch (error) {
      throw new HttpException('Failed to mark messages as read', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtClient)
  @Get('client/support-requests')
  public async findUserRequest(@Query() params: any): Promise<SupportRequestDocument[]> {
    try {
      return await this.chatService.findUserRequest(params);
    } catch (error) {
      throw new HttpException('Failed to retrieve support requests', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtManager)
  @Get('manager/support-request')
  public async findRequestById(@Query() params: any): Promise<SupportRequestDocument> {
    try {
      return await this.chatService.findRequestById(params);
    } catch (error) {
      throw new HttpException('Failed to retrieve support request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtManager)
  @Get('manager/support-requests-users')
  public async getUsersFromRequests(): Promise<any> {
    try {
      return await this.chatService.getUsersFromRequests();
    } catch (error) {
      throw new HttpException('Failed to retrieve users', HttpStatus.BAD_REQUEST);
    }
  }
}