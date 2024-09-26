import { Injectable } from '@nestjs/common';
import { Product } from './entity/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto,userId) {
    const user = { id: userId };  
    let product = this.productsRepository.create({ ...createProductDto, user });
  //  console.log(product);  
    return this.productsRepository.save(product);
  }
  findAll(){
    return this.productsRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.productsRepository.findOne({
        where: { id },
        relations: ['user']
      });
  }

  async update(id: string, product: Partial<Product>){
    await this.productsRepository.update(id, product);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.productsRepository.delete(id);
  }
}
