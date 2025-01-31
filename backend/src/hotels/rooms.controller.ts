import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoomDocument } from './schemas/rooms.schema';
import { INewRoomBodyDto } from './interfaces/dto/new-room-body';
import { JwtAdmin } from 'src/auth/jwt.auth.admin';
import { IUpdateRoomBodyDto } from './interfaces/dto/update-room';
import { IParamId } from './interfaces/dto/param-id';

@Controller('api')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('/common/hotel-rooms')
  public findAll(@Query() params: any): Promise<RoomDocument[]> {
    console.log('CONTROLLER ROOMS get', params);
    return this.roomsService.findAll(params);
  }

  @UseGuards(JwtAdmin)
  @Get('/admin/hotel-rooms/:id')
  public findOne(@Param() { id }: IParamId): any {
    console.log('CONTROLLER findOne', id);
    return this.roomsService.roomById(id);
  }

  @UseGuards(JwtAdmin)
  @Post('/admin/hotel-rooms')
  @UseInterceptors(FilesInterceptor('files'))
  public create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: INewRoomBodyDto,
  ): Promise<RoomDocument> {
    return this.roomsService.create(files, body);
  }

  @UseGuards(JwtAdmin)
  @Put('/admin/hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('files'))
  public update(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: IUpdateRoomBodyDto,
  ): Promise<RoomDocument> {
    console.log('ROOM CONTROLLER update', id);
    return this.roomsService.update(id, files, body);
  }
}
