import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { identity } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(userData) {
    console.log(userData)
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    console.log(hashedPassword)
    const newUser = await this.usersRepository.create({
      email:userData.email,
      password: hashedPassword,
      firstName:userData.firstName,
      lastName:userData. lastName,
    });
    return await this.usersRepository.save(newUser);
}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    console.log(id)
    return this.usersRepository.findOne({ where: { id:id } });
  }

  async update(id: string, userData) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await this.usersRepository.update(id, userData);
      return this.findOne(id);
  }

  async remove(id: string){
    await this.usersRepository.delete(id);
  }
}
