import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/users.schema';

@Module({
  imports: [
    JwtModule,
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [SocketService],
})
export class SocketModule {}
