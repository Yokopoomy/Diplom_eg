import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateUserDto } from './interfaces/dto/create-user';
import { IUpdateUserDto } from './interfaces/dto/update-user';
import * as bcrypt from 'bcrypt';
import { IUserFromFrontDto } from './interfaces/dto/userFromFront';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  public async findAll(params: any): Promise<UserDocument[]> {
    const { offset, limit, search } = params;
    const qOffset = Number(offset);
    const qLimit = Number(limit);
    const searchString = new RegExp(search, 'i');
    return await this.UserModel.find({
      $or: [
        { name: searchString },
        { email: searchString },
        { contactPhone: searchString },
      ],
    })
      .skip(qOffset * qLimit)
      .limit(qLimit + 1)
      .exec();
  }

  public async createUser(data: IUserFromFrontDto): Promise<UserDocument> {
    const saltOrRounds = 10;
    const password = data.passwordHash;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newData = {
      email: data.email,
      passwordHash: hash,
      name: data.name,
      contactPhone: data.contactPhone,
      role: data.role,
    };

    // Валидация email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newData.email)) {
      throw new BadRequestException('Неверный формат E-mail');
    }

    // Валидация пароля
    if (password.length < 8) {
      throw new BadRequestException('Пароль должен содержать минимум 8 символов');
    }

    // Валидация телефона 
    if (!/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(newData.contactPhone)) {
      throw new BadRequestException('Неверный формат телефона');
    }

    // Валидация имени
    if (!/^[A-Za-zА-Яа-я]{3,}$/.test(newData.name) || /\d/.test(newData.name) || /[^A-Za-zА-Яа-я]/.test(newData.name)) {
      throw new BadRequestException('Имя минимум 3 символа, не содержать цифр или спец символов');
    }

    try {
      const user = await this.UserModel.create(newData);
      return user;
    } catch (err) {
      throw new BadRequestException(
        'Пользователь с таким E-mail уже зарегистрирован.',
      );
    }
  }

  public delete(id: string): Promise<UserDocument> {
    return this.UserModel.findOneAndDelete({ _id: id });
  }

  public update(id: string, data: IUpdateUserDto): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate({ _id: id }, data);
  }

  async findOne(email: string): Promise<any> {
    return this.UserModel.findOne({ email: email }).exec();
  }
}