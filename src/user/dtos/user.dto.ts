import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateUserInfoDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    dob: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    mobileNumber: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    info: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    fcmToken: string;
  }


export class ChangePassword {
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'User old password' })
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      type: String,
      description: 'User new password',
    })
    newPassword: string;
  }
