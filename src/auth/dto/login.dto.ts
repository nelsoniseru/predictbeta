import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })  

  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'The password of the user' })  

  password: string;
}
