import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import {
  RegisterUserDto, validateUserDto
} from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import {ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/user/interfaces/user.interface';
// import { ApiGeneralCreatedResponse, GeneralResponse } from 'src/responses/general.responses';


@ApiTags('auth')
// @ApiExtraModels(GeneralResponse)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login user',
  })
  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginDto: LoginUserDto, @Req() req: RequestWithUser) {
    const user = await this.authService.validateUserWithPassword(
      loginDto.username,
      loginDto.password,
    );
    return this.authService.login(user)
  }
  
  @ApiResponse({ status: 201, description: 'User created successfully' })
  // @ApiGeneralCreatedResponse(User)
  @Post('/register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }


  @HttpCode(HttpStatus.OK)
  @Post('validate/user')
  validateUser(@Body() data: validateUserDto) {
    return this.authService.validateUserCredentials(data.detail);
  }
}
