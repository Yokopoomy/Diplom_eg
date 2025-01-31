import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { ICreateHotelDto } from './interfaces/dto/create-hotel';
import { IUpdateHotelDto } from './interfaces/dto/update-hotel';
import { FilesInterceptor } from '@nestjs/platform-express';
import { INewHotelBodyDto } from './interfaces/dto/new-hotel-body';
import { HotelDocument } from './schemas/hotels.schema';
import { JwtAdmin } from 'src/auth/jwt.auth.admin';
import { IParamId } from './interfaces/dto/param-id';

@Controller('api')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  /**
   * Получить список всех отелей с возможностью фильтрации.
   * @param params Параметры запроса для фильтрации.
   * @returns Список отелей.
   */
  // @UseGuards(JwtAdmin)
  @Get('/admin/hotels')
  public findAll(@Query() params: any): any {
    return this.hotelsService.findAll(params);
  }

  /**
   * Получить информацию об отеле по его ID.
   * @param id Идентификатор отеля.
   * @returns Информация об отеле.
   */
  @UseGuards(JwtAdmin)
  @Get('/admin/hotels/:id')
  public findOne(@Param() { id }: IParamId): any {
    console.log('CONTROLLER findOne', id);
    return this.hotelsService.hotelById(id);
  }

  /**
   * Создать новый отель.
   * @param files Загруженные файлы (изображения отеля).
   * @param body Данные для создания отеля.
   * @returns Созданный отель.
   */
  @UseGuards(JwtAdmin)
  @Post('/admin/hotels/')
  @UseInterceptors(FilesInterceptor('files'))
  public create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: INewHotelBodyDto,
  ): Promise<any> {
    return this.hotelsService.create(files, body);
  }

  /**
   * Обновить информацию об отеле.
   * @param id Идентификатор отеля.
   * @param files Загруженные файлы (изображения отеля).
   * @param body Данные для обновления отеля.
   * @returns Обновленный отель.
   */
  @UseGuards(JwtAdmin)
  @Put('/admin/hotels/:id')
  @UseInterceptors(FilesInterceptor('files'))
  public update(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: IUpdateHotelDto,
  ): Promise<HotelDocument> {
    return this.hotelsService.update(id, files, body);
  }

  /**
   * Удалить отель по его ID.
   * @param id Идентификатор отеля.
   * @returns Удаленный отель.
   */
  @UseGuards(JwtAdmin)
  @Delete('/admin/hotels/:id')
  public delete(@Param('id') id: string): Promise<HotelDocument> {
    return this.hotelsService.delete(id);
  }
}