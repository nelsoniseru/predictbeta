import { IsString, IsUUID, IsDecimal, IsNotEmpty,IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the product' })  
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the product' })  
  description: string;

  @IsNumber({}, { message: 'Price must be a valid number' })
  @ApiProperty({ description: 'Product price', type: Number, example: 0.00 })  
  price: number;

  @IsUUID()
  @ApiProperty({ description: 'The id of the user' })  
  userId: string;
}
