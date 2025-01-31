import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common'; // Импорт Logger из @nestjs/common
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocetsGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebsocetsGateway.name); // Использование Logger

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      this.logger.log(`Client connected: ${socket.id}`);
    });

    this.server.on('disconnect', (socket: Socket) => {
      this.logger.log(`Client disconnected: ${socket.id}`);
    });
  }

  @SubscribeMessage('clientToManager')
  handleMessageToManager(@MessageBody() body: any): string {
    this.logger.log(`Received message from client to manager: ${JSON.stringify(body)}`);
    body.func = 'clientToManager'; // Для отладки
    const messageClientName = `serverToClient${body.clientId}`;
    this.server.emit(messageClientName, body);
    this.server.emit('serverToManager', body);
    return 'clientToManager';
  }

  @SubscribeMessage('managerToClient')
  handleMessageToClient(@MessageBody() body: any): string {
    this.logger.log(`Received message from manager to client: ${JSON.stringify(body)}`);
    body.func = 'managerToClient'; // Для отладки
    const messageClientName = `serverToClient${body.clientId}`;
    this.server.emit(messageClientName, body);
    this.server.emit('serverToManager', body);
    return 'managerToClient';
  }

  @SubscribeMessage('clientReadMessage')
  clientReadMessage(@MessageBody() body: any): string {
    this.logger.log(`Client read message: ${JSON.stringify(body)}`);
    body.func = 'clientReadMessage'; // Для отладки
    this.server.emit('serverToManager', body);
    return 'clientReadMessage';
  }

  @SubscribeMessage('managerReadMessage')
  managerReadMessage(@MessageBody() body: any): string {
    this.logger.log(`Manager read message: ${JSON.stringify(body)}`);
    body.func = 'managerReadMessage'; // Для отладки
    const messageClientName = `serverToClient${body.clientId}`;
    this.server.emit(messageClientName, body);
    return 'managerReadMessage';
  }
}