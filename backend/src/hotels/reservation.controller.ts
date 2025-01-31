import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ICreateReservationDto } from './interfaces/dto/create-reservation';
import { JwtClient } from 'src/auth/jwt.client';
import { JwtManager } from 'src/auth/jwt.auth.manager';

@Controller('api')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtClient)
  @Get('/client/reservations')
  public findByUserId(@Query() params: any) {
    return this.reservationService.findByUserId(params);
  }

  @UseGuards(JwtManager)
  @Get('/manager/reservations')
  public mgrfindByUserId(@Query() params: any) {
    console.log('CONTROLLER - /manager/reservations', params);
    return this.reservationService.findByUserId(params);
  }

  @UseGuards(JwtClient)
  @Post('/client/reservations')
  public create(@Body() body: ICreateReservationDto): any {
    return this.reservationService.create(body);
  }

  @UseGuards(JwtClient)
  @Delete('/client/reservations/:id')
  public delete(@Param() { id }: any): any {
    return this.reservationService.delete(id);
  }

  @UseGuards(JwtManager)
  @Delete('/manager/reservations/:id')
  public mgrdelete(@Param() { id }: any): any {
    return this.reservationService.delete(id);
  }
}
