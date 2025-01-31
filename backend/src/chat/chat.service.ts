import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestDocument } from './schemas/SupportRequest.schema';
import { Message, MessageDocument } from './schemas/Message.schema';
import { SendMessageDto } from './interfaces/SendMessageDto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { ReadMessageDto } from './interfaces/ReadMessageDTO';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // Удаление всех сообщений (для разработки)
  public async deleteAllMessages(): Promise<void> {
    try {
      await this.supportRequestModel.deleteMany({});
      await this.messageModel.deleteMany({});
    } catch (error) {
      throw new HttpException('Failed to delete messages', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Создание нового сообщения
  public async createMessage(body: SendMessageDto): Promise<MessageDocument> {
    try {
      const { author, text } = body;
      const newMessage = {
        author,
        sentAt: new Date(),
        text,
        readAt: null,
      };
      return await this.messageModel.create(newMessage);
    } catch (error) {
      throw new HttpException('Failed to create message', HttpStatus.BAD_REQUEST);
    }
  }

  // Получение или создание чата
  public async getChat(
    params: { id: string; author: string },
    newMessage: MessageDocument,
  ): Promise<SupportRequestDocument> {
    try {
      const { id, author } = params;
      let chat;

      if (id === 'newchat') {
        const newChat = {
          user: author,
          createdAt: new Date(),
          messages: [newMessage._id],
          isActive: true,
        };
        chat = await this.supportRequestModel.create(newChat);
      } else {
        chat = await this.supportRequestModel.findById(id);
        if (!chat) {
          throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
        }
        chat.messages.push(newMessage._id);
        chat = await this.supportRequestModel.findByIdAndUpdate(
          chat._id,
          { messages: chat.messages },
          { new: true },
        );
      }

      return chat;
    } catch (error) {
      throw new HttpException('Failed to get or create chat', HttpStatus.BAD_REQUEST);
    }
  }

  // Добавление сообщения в чат
  public async addMessage(
    body: SendMessageDto,
    id: string,
  ): Promise<SupportRequestDocument> {
    try {
      const paramsForChat = { id, author: body.author };
      const newMessage = await this.createMessage(body);
      return await this.getChat(paramsForChat, newMessage);
    } catch (error) {
      throw new HttpException('Failed to add message', HttpStatus.BAD_REQUEST);
    }
  }

  // Отметка сообщений как прочитанных
  public async readMessage(body: ReadMessageDto, id: string): Promise<void> {
    try {
      const readDate = new Date();
      const { createdBefore } = body;

      await Promise.all(
        createdBefore.map(async (messageId) => {
          await this.messageModel.findByIdAndUpdate(
            messageId,
            { readAt: readDate },
            { new: true },
          );
        }),
      );
    } catch (error) {
      throw new HttpException('Failed to mark messages as read', HttpStatus.BAD_REQUEST);
    }
  }

  // Поиск запросов пользователя
  public async findUserRequest(params: { id: string }): Promise<SupportRequestDocument[]> {
    try {
      const { id } = params;
      return await this.supportRequestModel
        .find({ user: id })
        .populate('messages')
        .exec();
    } catch (error) {
      throw new HttpException('Failed to find user requests', HttpStatus.BAD_REQUEST);
    }
  }

  // Поиск запроса по ID
  public async findRequestById(params: { id: string }): Promise<SupportRequestDocument> {
    try {
      const { id } = params;
      const request = await this.supportRequestModel
        .findById(id)
        .populate('messages')
        .exec();

      if (!request) {
        throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
      }

      return request;
    } catch (error) {
      throw new HttpException('Failed to find request by ID', HttpStatus.BAD_REQUEST);
    }
  }

  // Получение пользователей из запросов
  public async getUsersFromRequests(): Promise<any> {
    try {
      return await this.supportRequestModel
        .find()
        .select(['-__v', '-isActive', '-createdAt', '-messages'])
        .populate('user', ['name'])
        .exec();
    } catch (error) {
      throw new HttpException('Failed to get users from requests', HttpStatus.BAD_REQUEST);
    }
  }
}