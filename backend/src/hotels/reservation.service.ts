import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Reservation,
  ReservationDocument,
} from './schemas/reservations.schema';
import { ICreateReservationDto } from './interfaces/dto/create-reservation';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private ReservationModel: Model<ReservationDocument>, // private readonly hotelService: HotelsService,
  ) {}

  //=======================================
  public async findByUserId(params): Promise<ReservationDocument[]> {
    const { userid } = params;
    return await this.ReservationModel.find({ userId: userid })
      .populate('roomId', ['title', 'description', 'images'])
      .populate('hotelId', ['title', 'description'])
      .select('-__v')
      .exec();
  }

  //=======================================
  public async create(
    body: ICreateReservationDto,
  ): Promise<ReservationDocument> {
    const newReservation = await this.ReservationModel.create(body);
    return newReservation;
  }

  //=======================================
  public async delete(id: string): Promise<ReservationDocument> {
    const delReservation = await this.ReservationModel.findOneAndDelete({
      _id: id,
    });
    return delReservation;
  }
}
