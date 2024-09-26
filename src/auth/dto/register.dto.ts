import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The firstname of the user' })  

    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The lastname of the user' })  
    lastName: string;
  
    @IsEmail()
    @ApiProperty({ description: 'The email of the user' })  

    email: string;
  
    @IsString()
    @MinLength(6)
    @ApiProperty({ description: 'The password of the user' })  
    password: string;
}
