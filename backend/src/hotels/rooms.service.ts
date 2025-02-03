import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { access, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Room, RoomDocument } from './schemas/rooms.schema';
import { INewRoomBodyDto } from './interfaces/dto/new-room-body';
import { HotelsService } from './hotels.service';
import { IUpdateRoomBodyDto } from './interfaces/dto/update-room';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private RoomModel: Model<RoomDocument>,
    private readonly hotelService: HotelsService,
  ) {}

  public async findAll(params: any): Promise<RoomDocument[]> {
    const { offset, limit, hotelid } = params;
    const qOffset = Number(offset);
    const qLimit = Number(limit);

    return await this.RoomModel.find({ hotel: hotelid })
      .skip(qOffset * qLimit)
      .limit(qLimit + 1)
      .exec();
  }

  public async roomById(id: string): Promise<RoomDocument> {
    return this.RoomModel.findById(id).exec();
  }

public async create(files: any[], body: INewRoomBodyDto): Promise<RoomDocument> {
    const picsFolder = '/public/rooms';
    const folder = join(__dirname, '..', '..', picsFolder);

    try {
      await access(folder);
    } catch (e) {
      await mkdir(folder, { recursive: true });
    }

    let resWriteFiles;
    if (files && files.length > 0) {
      resWriteFiles = await Promise.all(
        files.map(async (file) => {
          const fileExtension = file.originalname.split('.')[1];
          if (
            !file.mimetype.includes('image') ||
            !['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)
          ) {
            console.log(
              `Файл ${file.originalname} не является изображением или имеет недопустимый формат`,
            );
            return null;
          }

          const newFileName = `onserv-${uuidv4()}.${fileExtension}`;
          try {
            await writeFile(join(folder, newFileName), file.buffer);
          } catch (error) {
            console.log('Ошибка при записи файла:', error.message);
            return null;
          }

          return {
            url: `${picsFolder}/${newFileName}`,
            name: newFileName,
          };
        }),
      );

      // Убираем null из массива
      resWriteFiles = resWriteFiles.filter(file => file !== null);
    } else {
      // Если файлы не переданы, используем заглушку
      resWriteFiles = [{
        url: "/public/rooms/Room.png",
        name: "Room.png"
      }];
    }

    // Если resWriteFiles пустой, используем заглушку
    if (resWriteFiles.length === 0) {
      resWriteFiles = [{
        url: "/public/rooms/Room.png",
        name: "Room.png"
      }];
    }

    const newRoom = {
      hotel: body.hotelId,
      title: body.title,
      description: body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAnable: body.isAnable,
      images: JSON.stringify(resWriteFiles),
    };

    return this.RoomModel.create(newRoom);
}

  public async update(id: string, files: any[], body: IUpdateRoomBodyDto): Promise<RoomDocument> {
    const picsFolder = '/public/rooms';
    const folder = join(__dirname, '..', '..', picsFolder);

    try {
      await access(folder);
    } catch (e) {
      await mkdir(folder, { recursive: true });
    }

    let resWriteFiles;
    if (files && files.length > 0) {
      // Если переданы новые файлы, обрабатываем их
      resWriteFiles = await Promise.all(
        files.map(async (file) => {
          const fileExtension = file.originalname.split('.')[1];
          const fileName = file.originalname.split('.')[0];
          let newFileName: string;

          if (fileName.slice(0, 6) === 'onserv') {
            newFileName = file.originalname;
          } else {
            if (
              !file.mimetype.includes('image') ||
              !['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)
            ) {
              console.log(
                `Файл ${file.originalname} не является изображением или имеет недопустимый формат`,
              );
              return null;
            }

            newFileName = `onserv-${uuidv4()}.${fileExtension}`;
            try {
              await writeFile(join(folder, newFileName), file.buffer);
            } catch (error) {
              console.log('Ошибка при записи файла:', error.message);
              return null;
            }
          }

          return {
            url: `${picsFolder}/${newFileName}`,
            name: newFileName,
          };
        }),
      );

      // Убираем null из массива
      resWriteFiles = resWriteFiles.filter(file => file !== null);
    } else {
      // Если файлы не переданы, используем существующие данные из базы
      const existingRoom = await this.RoomModel.findById(id).exec();
      if (existingRoom && existingRoom.images) {
        resWriteFiles = JSON.parse(existingRoom.images);
      } else {
        // Если в базе данных нет файлов, используем заглушку
        resWriteFiles = [{
          url: "/public/rooms/Room.png",
          name: "Room.png"
        }];
      }
    }

    // Если resWriteFiles пустой, используем заглушку
    if (resWriteFiles.length === 0) {
      resWriteFiles = [{
        url: "/public/rooms/Room.png",
        name: "Room.png"
      }];
    }

    const newRoom = {
      title: body.title,
      description: body.description,
      updatedAt: new Date(),
      images: JSON.stringify(resWriteFiles),
    };

    return this.RoomModel.findOneAndUpdate({ _id: id }, newRoom, { new: true });
  }
}