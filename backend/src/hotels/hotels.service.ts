import { Injectable } from '@nestjs/common';
import { Hotel, HotelDocument } from './schemas/hotels.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { access, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ICreateHotelDto } from './interfaces/dto/create-hotel';
import { IUpdateHotelDto } from './interfaces/dto/update-hotel';
import { INewHotelBodyDto } from './interfaces/dto/new-hotel-body';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
  ) {}

  public async findAll(params: any): Promise<HotelDocument[]> {
    const { offset, limit, search } = params;
    const qOffset = Number(offset);
    const qLimit = Number(limit);
    const searchString = new RegExp(search === '' ? '.' : search, 'i');

    return await this.HotelModel.find({ title: searchString })
      .skip(qOffset * qLimit)
      .limit(qLimit + 1)
      .exec();
  }

  public async hotelById(id: string): Promise<HotelDocument> {
    return this.HotelModel.findById(id).exec();
  }

  public async create(files: any[], body: INewHotelBodyDto): Promise<ICreateHotelDto> {
    const picsFolder = '/public/hotels';
    const folder = join(__dirname, '..', '..', picsFolder);

    try {
      await access(folder);
    } catch (e) {
      await mkdir(folder, { recursive: true });
    }

    const resWriteFiles = await Promise.all(
      files.map(async (file) => {
        const fileExtension = file.originalname.split('.')[1];
        if (
          !file.mimetype.includes('image') ||
          !['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)
        ) {
          console.log(
            `Файл ${file.originalname} не является изображением или имеет недопустимый формат`,
          );
          return;
        }

        const newFileName = `onserv-${uuidv4()}.${fileExtension}`;
        try {
          await writeFile(join(folder, newFileName), file.buffer);
        } catch (error) {
          console.log('Ошибка при записи файла:', error.message);
        }

        return {
          url: `${picsFolder}/${newFileName}`,
          name: newFileName,
        };
      }),
    );

    const newHotel = {
      title: body.title,
      description: body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      files: JSON.stringify(resWriteFiles),
    };

    return this.HotelModel.create(newHotel);
  }

  public async update(id: string, files: any[], body: IUpdateHotelDto): Promise<HotelDocument> {
    const picsFolder = '/public/hotels';
    const folder = join(__dirname, '..', '..', picsFolder);

    try {
      await access(folder);
    } catch (e) {
      await mkdir(folder, { recursive: true });
    }

    const resWriteFiles = await Promise.all(
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
            return;
          }

          newFileName = `onserv-${uuidv4()}.${fileExtension}`;
          try {
            await writeFile(join(folder, newFileName), file.buffer);
          } catch (error) {
            console.log('Ошибка при записи файла:', error.message);
          }
        }

        return {
          url: `${picsFolder}/${newFileName}`,
          name: newFileName,
        };
      }),
    );

    const newHotel = {
      title: body.title,
      description: body.description,
      updatedAt: new Date(),
      files: JSON.stringify(resWriteFiles),
    };

    return this.HotelModel.findOneAndUpdate({ _id: id }, newHotel);
  }

  public async delete(id: string): Promise<HotelDocument> {
    return this.HotelModel.findOneAndDelete({ _id: id });
  }
}