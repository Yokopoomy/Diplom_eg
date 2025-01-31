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

const PICS_FOLDER = '/public/rooms';
const ALLOWED_IMAGE_TYPES = ['png', 'jpg', 'jpeg', 'webp'];

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

  private async ensureFolderExists(folderPath: string): Promise<void> {
    try {
      await access(folderPath);
    } catch (e) {
      await mkdir(folderPath, { recursive: true });
    }
  }

  private async handleFileUpload(file: any, folderPath: string): Promise<{ url: string; name: string } | null> {
    const fileExtension = file.originalname.split('.')[1];
    if (!file.mimetype.includes('image') || !ALLOWED_IMAGE_TYPES.includes(fileExtension)) {
      console.log(`Файл ${file.originalname} не является изображением или имеет недопустимый формат`);
      return null;
    }

    const newFileName = `onserv-${uuidv4()}.${fileExtension}`;
    try {
      await writeFile(join(folderPath, newFileName), file.buffer);
      return {
        url: `${PICS_FOLDER}/${newFileName}`,
        name: newFileName,
      };
    } catch (error) {
      console.log('ERROR WRITE files', error.message);
      return null;
    }
  }

  public async create(files: any[], body: INewRoomBodyDto): Promise<RoomDocument> {
    const folderPath = join(__dirname, '..', '..', PICS_FOLDER);
    await this.ensureFolderExists(folderPath);

    const resWriteFiles = await Promise.all(
      files.map((file) => this.handleFileUpload(file, folderPath)),
    );

    const newHotel = {
      hotel: body.hotelId,
      title: body.title,
      description: body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAnable: body.isAnable,
      images: JSON.stringify(resWriteFiles.filter(Boolean)),
    };

    return this.RoomModel.create(newHotel);
  }

  public async update(id: string, files: any[], body: IUpdateRoomBodyDto): Promise<RoomDocument> {
    const folderPath = join(__dirname, '..', '..', PICS_FOLDER);
    await this.ensureFolderExists(folderPath);

    const resWriteFiles = await Promise.all(
      files.map((file) => this.handleFileUpload(file, folderPath)),
    );

    const newRoom = {
      title: body.title,
      description: body.description,
      updatedAt: new Date(),
      images: JSON.stringify(resWriteFiles.filter(Boolean)),
    };

    return this.RoomModel.findOneAndUpdate({ _id: id }, newRoom, { new: true }).exec();
  }
}