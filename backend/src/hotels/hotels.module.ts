import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotetlSchema } from './schemas/hotels.schema';
import { Room, RoomSchema } from './schemas/rooms.schema';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationSchema } from './schemas/reservations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotetlSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [HotelsController, RoomsController, ReservationController],
  providers: [HotelsService, RoomsService, ReservationService],
})
export class HotelsModule {}
