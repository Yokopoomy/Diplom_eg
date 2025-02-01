import { Injectable, Logger } from '@nestjs/common';
import { Hotel, HotelDocument } from './schemas/hotels.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { access, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ICreateHotelDto } from './interfaces/dto/create-hotel';
import { IUpdateHotelDto } from './interfaces/dto/update-hotel';
import { INewHotelBodyDto } from './interfaces/dto/new-hotel-body';

const PICS_FOLDER = '/public/hotels';
const ALLOWED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'webp'];

@Injectable()
export class HotelsService {
  private readonly logger = new Logger(HotelsService.name);

  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
  ) {}

  public async findAll(params: any): Promise<HotelDocument[]> {
    const { offset, limit, search } = params;
    const qOffset = Number(offset);
    const qLimit = Number(limit);
    const searchString = new RegExp(search === '' ? '.' : search, 'i');

    return this.HotelModel.find({ title: searchString })
      .skip(qOffset * qLimit)
      .limit(qLimit + 1)
      .exec();
  }

  public async hotelById(id: string): Promise<HotelDocument> {
    return this.HotelModel.findById(id).exec();
  }

  public async create(
    files: any[],
    body: INewHotelBodyDto,
  ): Promise<ICreateHotelDto> {
    const folder = this.getPicsFolderPath();
    await this.ensureFolderExists(folder);

    const resWriteFiles = await this.processFiles(files, folder);

    const newHotel = {
      title: body.title,
      description: body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      files: JSON.stringify(resWriteFiles),
    };

    return this.HotelModel.create(newHotel);
  }

  public async update(
    id: string,
    files: any[],
    body: IUpdateHotelDto,
  ): Promise<HotelDocument> {
    const folder = this.getPicsFolderPath();
    await this.ensureFolderExists(folder);

    const resWriteFiles = await this.processFiles(files, folder);

    const newHotel = {
      title: body.title,
      description: body.description,
      updatedAt: new Date(),
      files: JSON.stringify(resWriteFiles),
    };

    return this.HotelModel.findOneAndUpdate({ _id: id }, newHotel, { new: true });
  }

  public async delete(id: string): Promise<HotelDocument> {
    return this.HotelModel.findOneAndDelete({ _id: id });
  }

  private getPicsFolderPath(): string {
    return join(__dirname, '..', '..', PICS_FOLDER);
  }

  private async ensureFolderExists(folder: string): Promise<void> {
    try {
      await access(folder);
    } catch (e) {
      await mkdir(folder, { recursive: true });
    }
  }

  private async processFiles(files: any[], folder: string): Promise<any[]> {
    return Promise.all(
      files.map(async (file) => {
        const fileExtension = file.originalname.split('.')[1];
        const fileName = file.originalname.split('.')[0];

        if (!this.isFileValid(file, fileExtension)) {
          this.logger.warn(`File ${file.originalname} is not a valid image or has an invalid format`);
          return null;
        }

        const newFileName = fileName.slice(0, 6) === 'onserv' 
          ? file.originalname 
          : `onserv-${uuidv4()}.${fileExtension}`;

        try {
          await writeFile(join(folder, newFileName), file.buffer);
        } catch (error) {
          this.logger.error(`Error writing file ${newFileName}: ${error.message}`);
          return null;
        }

        return {
          url: `${PICS_FOLDER}/${newFileName}`,
          name: newFileName,
        };
      }),
    ).then(files => files.filter(file => file !== null));
  }

  private isFileValid(file: any, fileExtension: string): boolean {
    return file.mimetype.includes('image') && ALLOWED_FILE_TYPES.includes(fileExtension);
  }
}