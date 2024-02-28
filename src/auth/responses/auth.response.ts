import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: string;
  
    @ApiProperty()
    firstName: string;
  
    @ApiProperty()
    lastName: string;
  
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    username: string;
  
    @ApiProperty()
    mobileNumber: string;

    @ApiProperty()
    emailVerified: string;

    @ApiProperty()
    mobileVerified: string;

    @ApiProperty()
    password: string;
  
    @ApiProperty()
    profilePics: string;
  
    @ApiProperty()
    isVerified: boolean;
  }


export class CreateResponse {
    @ApiProperty()
    user: User;
  
    @ApiProperty()
    token: string;
  }


export class OTPResponse {
    @ApiProperty()
    otp_hash: string;
  }
  export class OTPVerifiedResponse {
    @ApiProperty()
    verified: string;
  }
  