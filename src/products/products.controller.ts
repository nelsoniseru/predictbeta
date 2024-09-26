import { Controller, Get, Post, Body, Param, Patch, Delete,UsePipes,Request,ValidationPipe,UseGuards} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entity/products.entity';
import {CreateProductDto } from './dto/products.dto';
import {UpdateProductDto } from './dto/update.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('products') 
@ApiBearerAuth() 
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)  
  @UsePipes(new ValidationPipe({ whitelist: true })) 
  create(@Body() createProductDto: CreateProductDto,@Request() req) {
    const userId = req.user.id;  
    //console.log(userId)
    return this.productsService.create(createProductDto,userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) 
  @UsePipes(new ValidationPipe({ whitelist: true })) 
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id,updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)  
  remove(@Param('id') id: string){
    return this.productsService.remove(id);
  }
}
