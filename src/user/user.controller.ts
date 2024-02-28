import {
  Body,
  Controller, Get,
  Param,
  Patch, Req,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth, ApiExtraModels,
  ApiOperation, ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ChangePassword
} from './dtos/user.dto';
import { User } from 'src/auth/responses/auth.response';
import {
  ApiGeneralResponse, PaginatedDto
} from 'src/responses/general.responses';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
// @ApiExtraModels(PaginatedDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/get/profile/:id')
  async getUser(@Param('id') userId: string, @Req() req) {
    return this.userService.getUser(userId);
  }

  @Patch('change/password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Report a specific product by ID' })
  // @ApiGeneralResponse(User)
  changePassword(@Body() data: ChangePassword, @Req() req) {
    const { user } = req;
    console.log(user);
    return this.userService.changePassword(data, user);
  }
}
