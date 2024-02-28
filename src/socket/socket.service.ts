import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { User } from '../user/schemas/users.schema';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
@WebSocketGateway({
  cors: {
    // origin: '*',
    origin: ['http://localhost:3000'],
  },
})
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connections = new Map<string, Socket[]>();
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async handleConnection(client: Socket) {
    // Handle new client connection

    const user: any = await this.getUserFromAuthenticationToken(client);
    const userConnections = this.connections.get(user?._id.toString()) || [];
    userConnections.push(client);

    this.connections.set(user?._id.toString(), userConnections);
    // return user;

    // console.log(`Socket connected -  ------------: ${client.id} ${user?._id}`);
  }

  async handleDisconnect(client: Socket) {
    // Handle client disconnection
    const user: any = await this.getUserFromAuthenticationToken(client);

    const userConnections = this.connections.get(user?._id.toString()) || [];
    const updatedConnections = userConnections.filter(
      (connection) => connection !== client,
    );

    this.connections.set(user?._id.toString(), updatedConnections);

    // console.log(`Socket disconnected ------- : ${client.id}   ${user?._id}`);
  }
  public async getUserFromAuthenticationToken(client: Socket) {
    let auth_token = client.handshake.headers.authorization;
    if (!auth_token) {
      return null;
    }
    console.log(auth_token);
    auth_token = auth_token?.split(' ')[1];

    const payload = await this.jwtService.verify(auth_token, {
      secret: process.env.SECRET_KEY,
    });

    const userId = payload.id;

    if (!userId) {
      return null;
    }

    return this.userModel.findById(userId);
  }

  @SubscribeMessage('identity')
  async getInfo(@MessageBody() userId: string): Promise<User> {
    console.log(userId,'user');
    const user = await this.userModel.findById(userId);
    console.log(user);
    return user;
  }
}
